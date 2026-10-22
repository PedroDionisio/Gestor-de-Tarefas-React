# 📋 Gestor de Tarefas
 
Aplicação web para gestão de tarefas do dia a dia, construída como projeto de aprendizagem em React, cobre desde os fundamentos (componentes, estado, props) até navegação entre páginas e persistência de dados no browser.
 
## 🚀 Tecnologias

| Tecnologia | Utilização |
|---|---|
| **React 18** + **Vite** | Base da aplicação e ambiente de desenvolvimento |
| **React Router 6** (`createBrowserRouter`) | Navegação SPA, rotas, rotas dinâmicas e rotas protegidas |
| **Context API** | Estado global da sessão (`AuthContext`) e das tarefas (`TasksContext`) |
| **Tailwind CSS** | Estilos |
| **localStorage** | Persistência da sessão e das tarefas de cada utilizador |
| **UUID** | Identificadores únicos das tarefas |
| **Lucide React** | Ícones |
| **ESLint** | Qualidade e consistência do código |


## ✨ Funcionalidades

### Autenticação
- 🔐 Login com contas de demonstração e validação de credenciais
- 🛡️ Rotas protegidas: sem sessão iniciada, o utilizador é redirecionado para o login e, depois de entrar, volta à página que tentou abrir
- 👤 Página de perfil com os dados do utilizador
- 💾 A sessão mantém-se ao atualizar a página e termina com "Sair"

### Tarefas
- ➕ Criar tarefas com título e descrição, com validação de campos vazios
- ✔️ Marcar e desmarcar tarefas como concluídas
- ✏️ Editar o título e a descrição, na lista ou na página de detalhe
- 🗑️ Apagar tarefas, com pedido de confirmação
- 🔍 Página de detalhe para cada tarefa (`/tarefas/:id`), com "Mostrar mais" nas descrições longas
- 👥 **Tarefas separadas por utilizador:** cada conta vê apenas as suas tarefas

### Organização
- 🗂️ Filtros: Todas, Pendentes e Concluídas
- 🔎 Pesquisa por título em tempo real
- ↕️ Ordenação por data de criação ou por título
- 📊 Contador de tarefas concluídas
- 📅 Data de criação guardada em formato ISO e apresentada em formato português

### Acessibilidade
- ♿ Botões com ícone com `aria-label`, formulário de login com `label` associado a cada campo

## 🛠️ Como correr o projeto localmente
 
```bash
git clone https://github.com/PedroDionisio/Gestor-de-Tarefas-React.git
cd Gestor-de-Tarefas-React
npm install
npm run dev
```
## 📸 Pré-visualização
 
*(espaço reservado para screenshot)*

 
Projeto desenvolvido para fins de aprendizagem.
