MVP simples de um sistema ATS, que respeita os requisitos:

- Permita aos candidatos incluírem seus currículos;
- Permita a um recrutador visualizar os currículos cadastrados;
- Permitir que o recrutador cadastre uma vaga;
- Permitir que os candidatos se vinculem às vagas existentes;
- Demonstrar ao recrutador as vagas e os currículos cadastrados em um DashBoard.
- Contenha um documento explicando como executamos a sua aplicação.

## Tecnologias principais

- Angular 11
- dotNet core 5
- SQL Server

## Como executar

### manual

backend:

1. importar o backend com visual studio
2. criar uma cópia do appsettings.Development.example.json e salvar como appsettings.Development.json
3. editar o arquivo appsettings.Development.json para apontar para o seu banco sql server
4. executar como IIS express

frontend: 
1. npm i no projeto front-end
2. npm start

### docker

`docker-compose up --build -d`

ps: as vezes está tendo que rodar o comando duas vezes. Provavelmente é erro simples, mas to com sono.

## Usuários

- admin - **email**: admin@teste.com **senha**: 123456
- recrutador - **email**: recruiter@teste.com **senha**: 123456
- usuário comum - **email**: - snow@north.com **senha**: 123456
