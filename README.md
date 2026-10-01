# Barbearia Web

Aplicação web para apresentar uma barbearia, consultar serviços e realizar agendamentos.

## Funcionalidades

- Página inicial
- Página de serviços
- Fluxo de agendamento
- Página sobre a barbearia
- Página de contato com mapa

## Tecnologias

- React
- Vite
- React Router
- MapTiler SDK

## Requisitos

- Node.js e npm
- Uma chave de API do MapTiler para exibir o mapa

## Como executar

Na raiz do projeto, instale as dependências do frontend:

```bash
npm install --prefix frontend
```

Depois, ainda na raiz do projeto, inicie o servidor:

```bash
npm run dev
```

O Vite mostrará no terminal o endereço local para abrir no navegador. Se alterar o `.env` com o servidor ativo, pare-o com `Ctrl+C` e inicie novamente.

## Outros comandos

Execute na raiz do projeto:

```bash
npm run build
```

Para verificar o frontend com Oxlint:

```bash
npm --prefix frontend run lint
```

## Rotas da aplicação

As rotas são definidas em `frontend/src/app/App.jsx`:

| Rota | Arquivo | Responsabilidade |
| --- | --- | --- |
| `/` | `frontend/src/pages/HomePage.jsx` | Página inicial e apresentação da barbearia |
| `/servicos` | `frontend/src/pages/ServicosPage.jsx` | Lista e detalhes dos serviços |
| `/agendamento` | `frontend/src/pages/AgendamentoPage.jsx` | Fluxo de escolha de serviços, data e horário |
| `/sobre` | `frontend/src/pages/SobrePage.jsx` | Informações institucionais sobre a barbearia |
| `/contato` | `frontend/src/pages/ContatoPage.jsx` | Informações de contato e mapa |

## Organização do código

- `frontend/src/app/App.jsx`: configura a navegação entre as páginas.
- `frontend/src/pages/`: contém as páginas acessadas pelas rotas acima.
- `frontend/src/components/`: contém componentes reutilizáveis, como cabeçalho, rodapé, botões e mapa.
- `frontend/src/app/data/`: contém arquivos JSON com dados usados pela aplicação.
- `frontend/src/styles/`: contém os estilos das páginas.
- `backend/`: espaço reservado para o futuro backend; ainda não possui uma API implementada.

#Integrantes do grupo

- Pedro Vinícius de Almeida Santana
- Vanderson Gabriel Vasconselos Barbosa
- Emanuele Vitoria Lima de Souza
