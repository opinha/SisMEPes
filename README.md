# 🎣 SisMEPes - App de Pesca

Bem-vindo ao repositório do frontend do **SisMEPes**, um aplicativo mobile desenvolvido para auxiliar pescadores no registro e gerenciamento de suas pescarias.

> 🚧 **Nota:** Este é o projeto **Frontend** (interface). Ele necessita de uma conexão com o backend (Supabase) para funcionar completamente.

---

## 📱 Sobre o Projeto

O **SisMEPes** permite que pescadores esportivos mantenham um histórico detalhado de suas atividades.

### Principais Funcionalidades
- 🔐 **Autenticação:** Criação de conta e login seguros.
- 📔 **Diário de Pesca:** Registro de sessões de pesca com data e local.
- 🐟 **Registro de Capturas:** Cadastro de peixes com foto, peso, tamanho e espécie.
- 📍 **Meus Pontos:** Mapeamento e salvamento de coordenadas GPS dos melhores locais de pesca.
- 📊 **Dashboard:** Visualização rápida das suas estatísticas.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as tecnologias mais recentes do ecossistema React Native:

- **[React Native](https://reactnative.dev/)**
- **[Expo SDK 53](https://expo.dev/)**
- **[Expo Router](https://docs.expo.dev/router/introduction/)** (Navegação baseada em arquivos)
- **[TypeScript](https://www.typescriptlang.org/)** (Tipagem estática)
- **[Supabase](https://supabase.com/)** (Backend as a Service: Auth & Database)
- **[Lucide React Native](https://lucide.dev/)** (Ícones)

---

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter o ambiente configurado:

1. **Node.js** (Versão LTS).
2. **Gerenciador de Pacotes:** Recomendamos o **[pnpm](https://pnpm.io/)**, mas `npm` ou `yarn` também funcionam.
3. **Expo CLI:**

    ```bash
   npm install -g expo-cli

4.  **App Expo Go:** Instalado no seu celular (Android ou iOS) para testes físicos.

-----

## ⚙️ Instalação e Configuração

Siga o passo a passo abaixo para rodar o projeto na sua máquina:

### 1\. Clone o Repositório

```bash
git clone [https://github.com/opinha/SisMEPes.git](https://github.com/opinha/SisMEPes.git)
cd SisMEPes
```

### 2\. Instale as Dependências

```bash
pnpm install
# ou npm install
```

### 3\. Configuração das Variáveis de Ambiente (`.env`)

O projeto utiliza o Supabase. Você precisa criar um arquivo `.env` na raiz do projeto para conectar ao backend.

1.  Crie um arquivo chamado `.env` na raiz.
2.  Cole o conteúdo abaixo, substituindo pelos dados do seu painel no Supabase (Project Settings -\> API):

<!-- end list -->

```env
# URL do seu projeto Supabase
EXPO_PUBLIC_SUPABASE_URL=[https://sua-url-do-projeto.supabase.co](https://sua-url-do-projeto.supabase.co)

# Chave Pública (Anon / Public)
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-publica-aqui
```

-----

## ▶️ Como Rodar

Com tudo configurado, inicie o servidor de desenvolvimento:

```bash
pnpm start
# ou npx expo start
```

### Para testar:

  - **No Celular:** Abra o app **Expo Go** e escaneie o QR Code que aparecerá no terminal.
  - **No Emulador (Android):** Pressione `a` no terminal.
  - **No Simulador (iOS):** Pressione `i` no terminal (apenas macOS).

-----

## 🗄️ Estrutura do Banco de Dados (Supabase)

Para que o app funcione, seu projeto no Supabase deve ter as seguintes tabelas criadas:

| Tabela | Descrição |
| :--- | :--- |
| `user_profiles` | Dados estendidos do usuário (vinculado ao `auth.users`). |
| `diary_entries` | As sessões/dias de pesca. |
| `fish_catches` | Os peixes capturados dentro de uma sessão. |
| `fishing_spots` | Locais de pesca salvos pelo usuário. |

-----

## 🤝 Contribuição

Contribuições são bem-vindas\! Sinta-se à vontade para abrir *issues* ou enviar *pull requests*.

1.  Faça um Fork do projeto
2.  Crie uma Branch para sua Feature (`git checkout -b feature/MinhaFeature`)
3.  Faça o Commit (`git commit -m 'Add some AmazingFeature'`)
4.  Faça o Push (`git push origin feature/MinhaFeature`)
5.  Abra um Pull Request

-----

Desenvolvido com 💙 por [Gabriel Braga](https://www.google.com/search?q=https://github.com/opinha)



