# Aluguel de Carros

Aplicação Nuxt 4 + Vue 3 + TypeScript para explorar um catálogo e registrar solicitações de orçamento, contato e newsletter. Estilos em Tailwind CSS 4, ícones Lucide via Nuxt Icon.

## Ambiente

- Node **24.19 ou superior na linha 24**, conforme `.nvmrc` e `engines`.
- pnpm **11.24.0**, conforme `packageManager`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

No PowerShell, use `pnpm.cmd` se a política local bloquear o arquivo `pnpm.ps1`. Não é necessário mudar a política de segurança do Windows. Uma falha ao obter/verificar a versão do gerenciador deve ser resolvida usando a versão declarada e acesso ao registro; não ignore assinaturas.

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:http
pnpm preview
```

## Organização

- `app/pages`: rotas, metadados e validação de parâmetros.
- `app/layouts`: estrutura compartilhada de navegação e conteúdo.
- `components/layout`: cabeçalho e rodapé.
- `features/Vehicles`: fonte única do catálogo, tipos, filtros e card.
- `features/VehicleDetails`: apresentação do veículo e formulário de orçamento.
- `features/Requests`: tipos, validação, estado, action e serviço dos envios.
- `server/api/requests.post.ts`: ponto de entrada dos formulários.
- `server/services/requestStore.ts`: persistência privada em arquivos.

## Formulários e armazenamento

O projeto inclui um backend mínimo no próprio Nuxt. `POST /api/requests` valida dados e registra um JSON por protocolo. Os arquivos ficam em `.data/requests` por padrão e não são versionados nem servidos publicamente.

Os envios exigem um identificador UUID v4 no cabeçalho `Idempotency-Key`. Repetições com o mesmo identificador e conteúdo retornam o mesmo protocolo. Conteúdo diferente com o mesmo identificador retorna 409. A publicação de cada registro é atômica; o sucesso só é retornado depois da persistência.

Para listar protocolos localmente, execute:

```sh
pnpm requests:list
```

O comando não imprime o conteúdo das mensagens nem os e-mails. Para atendimento, o operador precisa consultar os arquivos privados no servidor. Ainda não há painel administrativo, notificações por e-mail, campanhas de newsletter, pagamento, login ou reserva automática. O cadastro da newsletter registra a autorização; não dispara e-mails.

O catálogo, as imagens e as diárias são **demonstrativos**. Uma solicitação não garante veículo, preço ou reserva. Os dados reais da locadora e as condições comerciais precisam ser definidos antes da operação.

## Configuração de produção

Copie `.env.example` para `.env` no desenvolvimento. Em produção, configure as variáveis no processo/hospedagem; o servidor compilado não carrega `.env` automaticamente.

- `NUXT_REQUESTS_DIR`: diretório privado e gravável para os registros. Use um **volume persistente**; não dependa do disco temporário de plataformas serverless. A implementação atual requer filesystem com suporte a hard links e uma operação Node com disco durável.
- `NUXT_PUBLIC_SITE_URL`: domínio absoluto da aplicação, sem dados pessoais, por exemplo `https://sua-locadora.com.br`. Configure antes do build e também no servidor, para incluir canonical nas páginas pré-renderizadas e configurar robots/sitemap. Deixe vazio localmente. Sem domínio, robots impede indexação e sitemap não é publicado.

```sh
pnpm build
node .output/server/index.mjs
```

Preserve os registros em atualizações e faça backups. Restrinja o acesso ao diretório ao operador. Para escala, múltiplas instâncias ou hospedagem serverless, migre o serviço de persistência para banco durável e configure proteção de abuso no proxy/API. Não existe endpoint público para consultar os registros.

Antes de publicar, configurar identificação e canais reais do responsável, processo de atendimento e retenção/remoção dos dados. A página de privacidade descreve o fluxo técnico atual e precisa refletir a operação real. Quando houver reserva imediata, acrescentar disponibilidade e preços confiáveis no servidor com controle de concorrência.

## Verificações

Os testes cobrem IDs, filtros, imutabilidade do catálogo, datas, entradas dos formulários e persistência/idempotência concorrente. `pnpm test:http`, executado após o build, inicia uma instância temporária e testa rotas, filtros, 404 e envios sem usar o diretório real de dados. A CI executa lint, tipos, testes, build e testes HTTP em push e pull request. O fluxo pode ser ampliado com testes de navegador em infraestrutura apropriada.

A tipografia usa fontes do sistema: não depende de download de fontes nem de famílias declaradas sem carregamento. As imagens têm espaço reservado e os cards preservam o veículo com `object-contain`. A substituição das imagens demonstrativas deve acompanhar os dados reais da frota.
