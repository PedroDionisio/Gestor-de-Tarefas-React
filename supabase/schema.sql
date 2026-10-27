-- =============================================================================
-- Gestor de Tarefas - esquema da base de dados (Supabase / PostgreSQL)
-- Correr uma vez no SQL Editor do Supabase.
--
--   auth.users (Supabase)  1 ── 1  public.profiles  1 ── N  public.tasks
-- =============================================================================


-- 1. TABELAS -----------------------------------------------------------------
-- auth.users é gerida pelo Supabase (email, palavra-passe, sessões).
-- profiles guarda os dados públicos de cada conta: o id é o mesmo da conta,
-- por isso é ao mesmo tempo chave primária e chave estrangeira (relação 1:1).
-- Cada tarefa pertence a um perfil (relação 1:N).

create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  name        text not null check (char_length(trim(name)) between 1 and 60),
  bio         text not null default '' check (char_length(bio) <= 300),
  avatar_url  text,
  created_at  timestamptz not null default now()
);

create table public.tasks (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null default auth.uid()
               references public.profiles (id) on delete cascade,
  title        text not null check (char_length(trim(title)) > 0),
  description  text not null default '',
  is_completed boolean not null default false,
  created_at   timestamptz not null default now()
);

create index tasks_user_id_idx on public.tasks (user_id);


-- 2. ROW LEVEL SECURITY ------------------------------------------------------
-- Com a RLS ligada, ninguém lê nem altera linhas sem uma política que o permita.

alter table public.profiles enable row level security;
alter table public.tasks enable row level security;

-- profiles: cada utilizador vê e edita só o seu perfil.
-- Não há política de insert (o perfil é criado pelo trigger) nem de delete
-- (o perfil é apagado em cascata quando a conta é apagada).

create policy "Ver o próprio perfil"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Editar o próprio perfil"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- tasks: cada utilizador só vê, cria, edita e apaga as suas tarefas.

create policy "Ver as próprias tarefas"
  on public.tasks for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Criar tarefas para si próprio"
  on public.tasks for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Editar as próprias tarefas"
  on public.tasks for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Apagar as próprias tarefas"
  on public.tasks for delete
  to authenticated
  using ((select auth.uid()) = user_id);


-- 3. NOVA CONTA: PERFIL + TAREFA DE BOAS-VINDAS ------------------------------
-- Sempre que é criada uma conta (nova linha em auth.users), o trigger:
--   1) cria o perfil, com o nome enviado no registo (options.data.name);
--   2) cria a tarefa "Explorar a app".
-- A ordem importa: a tarefa aponta para o perfil, por isso o perfil tem de
-- existir primeiro.
-- security definer: a função corre com permissões de dono, porque no momento
-- do registo ainda não há sessão e a RLS bloquearia os inserts.

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, name)
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'name'), ''),
      split_part(new.email, '@', 1)
    )
  );

  insert into public.tasks (user_id, title, description)
  values (
    new.id,
    'Explorar a app',
    'Bem-vindo ao Gestor de Tarefas! Esta tarefa foi criada automaticamente '
    || 'com a tua conta. Experimenta marcá-la como concluída, editar o título '
    || 'e a descrição, abrir os detalhes na seta e, no fim, apagá-la.'
  );

  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
