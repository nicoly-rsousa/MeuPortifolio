# Frontend do portfólio

Site estático, sem instalação de dependências ou build. Para desenvolvimento:

```sh
cd /workspace/MeuPortifolio
python3 -m http.server 8000 --bind 127.0.0.1
node --check meuscript.js
```

## Direção visual

Referência pesquisada: [Brittany Chiang / v4](https://github.com/bchiang7/v4).
A consulta ao GitHub retornou 8.289 estrelas em 29/10/2026. Também foi consultado
[Bruno Simon / folio-2019](https://github.com/brunosimon/folio-2019), com 4.751 estrelas.
Esses indicadores medem interesse no GitHub; não estabelecem um ranking de buscas.

Foram usados como referência a apresentação objetiva, a hierarquia tipográfica,
o fundo escuro e o destaque para os projetos. O layout e o código foram escritos
para este portfólio, sem reutilizar código ou imagens desses portfólios.

## Seleção e origem das imagens

A pesquisa encontrou seis repositórios na [lista pública de estrelas](https://github.com/nicoly-rsousa?tab=stars)
em 29/10/2026. A galeria contém cinco deles: CRUD de Produtos foi removido a pedido da titular. A galeria é estática: novas estrelas não são importadas automaticamente.

| Projeto | Repositório | Origem da captura |
| --- | --- | --- |
| Farol | [Maratona.de.IA](https://github.com/nicoly-rsousa/Maratona.de.IA) | Tela de login original executada localmente, sem preenchimento de credenciais; a configuração ausente do Supabase é indicada na própria tela |
| PetHealth Lite | [-PetHealthLite-](https://github.com/nicoly-rsousa/-PetHealthLite-) | Página inicial executada localmente, sem alterações; coautoria de Nicoly e Mhell Barroca, conforme README |
| MinhasFinanças | [MinhasFinancas](https://github.com/nicoly-rsousa/MinhasFinancas) | Dashboard local com os dados demonstrativos padrão; as classes Tailwind existentes foram compiladas com Tailwind 3 para a captura, pois o CDN de runtime não carregou |
| Controle de Almoxarifado | [controle-almoxarifado](https://github.com/nicoly-rsousa/controle-almoxarifado) | Página de alunos local; a API/MySQL não foi iniciada, e a captura mantém a mensagem original de indisponibilidade |
| Apoio na Rede | [EmersonBayonetta/Apoio-na-Rede](https://github.com/EmersonBayonetta/Apoio-na-Rede) | Página inicial em modo demo; o titular do repositório é identificado no card, sem atribuir sua autoria a Nicoly |

As imagens são capturas das interfaces, não mockups inventados. Nenhum dado de
produção ou credencial foi inserido. As cópias de pesquisa e dependências ficaram
fora deste checkout. Capturar um frontend não valida o backend daquele projeto.

## Comportamento

- Menu responsivo com estado expandido, fechamento por link e Escape.
- Filtros Todos / Full Stack / Front-end com contagem anunciada.
- Ampliação de imagens em dialog nativo com foco, fechamento e retorno ao botão.
- Âncoras e conteúdo principal disponíveis sem JavaScript.
- Sem bibliotecas, fontes remotas, CDN de ícones, cursores personalizados ou animações contínuas.
- Preferência por menos movimento respeitada.

A publicação na Vercel continua usando preset **Other**, pasta raiz e nenhum
comando de build. Alterações locais não são uma confirmação de deploy.

## Validação executada

Chromium local nas larguras de 320, 390, 768, 1024 e 1440 pixels:
cinco imagens carregadas, filtros com resultados 2/3/5, cinco diálogos de ampliação,
fechamento por Escape e retorno de foco, menu móvel, âncoras válidas, sem rolagem
horizontal, erros JavaScript ou respostas HTTP de erro. Verificados também o
conteúdo sem JavaScript, preferência por movimento reduzido, `node --check`
e `git diff --check`. Não houve publicação durante esta alteração.
