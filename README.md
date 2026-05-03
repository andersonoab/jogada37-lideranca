# A Jogada 37 da Liderança

Site interativo para palestra sobre Inteligência Artificial, inteligência emocional e comunicação no contexto de liderança retail.

## Objetivo

Coletar percepções dos participantes por QR Code, gerar uma leitura consolidada da sala e apoiar uma palestra prática sobre uso responsável de IA na liderança.

## Estrutura

```text
jogada37_lideranca_site/
├── index.html
├── ao-vivo.html
├── resultado.html
├── admin.html
├── termos.html
├── obrigado.html
├── style.css
├── script.js
├── config.js
├── apps-script.gs
├── README.md
├── ROTEIRO_PALESTRA.md
├── PROMPT_NOTEBOOKLM_VIDEO.md
└── assets/
    └── qr-code.png
```

## Como usar

1. Abra `ao-vivo.html` no telão.
2. A plateia escaneia o QR Code.
3. O participante acessa `index.html`, preenche os dados e responde às perguntas.
4. O site registra a resposta.
5. No final, abra `resultado.html`.
6. Use `admin.html` para exportar CSV.

Senha do admin: `jogada37`.

## GitHub Pages

1. Crie um repositório.
2. Envie todos os arquivos.
3. Vá em Settings > Pages.
4. Publique a branch `main`.
5. Copie a URL gerada.
6. Atualize `SITE_URL` no arquivo `config.js`.

## Google Sheets

1. Crie uma planilha Google.
2. Vá em Extensões > Apps Script.
3. Cole o conteúdo de `apps-script.gs`.
4. Implante como Aplicativo da Web.
5. Copie a URL.
6. Cole em `APPS_SCRIPT_URL` no arquivo `config.js`.

## Indicadores

- Total de participantes
- Total de respostas
- Sentimento predominante sobre IA
- Média de preparo
- Maior oportunidade de IA
- Principal desafio de comunicação
- O que a IA nunca deve substituir

## Frase central

A IA pode melhorar a resposta, mas a confiança continua sendo construída pela liderança.

## Assinatura

Anderson Marinho | Igarapé Digital
