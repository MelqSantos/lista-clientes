# Lista de clientes

Projeto para controle de clientes.

## Descrição

Projeto baseado em API Rest Java utilizando o framework Spring, para o Front-end foi utilizado o framework Angular. 

## Prototipação
Utilização da ferramenta de design Figma
* Protótipo da versão 0.1 :  [clique aqui](https://www.figma.com/file/4s9uXDgkJ2v2O2ix8nd0hp/Lista-de-clientes?node-id=0%3A1&t=2o6tVviqccphI2h1-1)

## Deploy
* **Front-end** : Foi utilizado a plataforma Netlify - [clique aqui](https://clientlist.netlify.app)
* **Back-end / Documentação Swagger** : Foi utilizado a plataforma Railway - [clique aqui](https://lista-clientes.up.railway.app/swagger-ui/index.html)

## Instalação local

### Front-end
Configuração do Front-end

* Instalação do Angular
```
npm install -g @angular/cli
```

* Download de todas as dependências do projeto
```
npm install --force
```

* Rodar o projeto
```
ng serve -o
```

### Back-end
Configuração do Back-end

* Alterar o perfil no arquivo **application.properties**
```
spring.profiles.active=dev
```

* Alterar usuario e senha no arquivo **application-dev.properties**
```
spring.datasource.username=root
spring.datasource.password=root
```
