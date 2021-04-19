# DESAFIO TÉCNICO

Sistema simple para gestão de conta.

## Pasos para Deploy 

### 1. Build da imagem do docker

1.  Construir a imagem do docker.
 ```
 $: sudo docker-compose build jaspesoft
```
2. Executar a imagem
 ```
 $: sudo docker-compose start jaspesofts
```

### 2. Configure o nginx para expor a API para a internet

1. Criamos um arquivo de configuração para nosso sistema dentro da basta nginx 

```
$: sudo nano /etc/nginx/sites-available/sistema.conf
```
2. Copiamos e colamos o siguiente conteuo dentro do arquivo sistema.conf que foi criado no passo anterior.
```
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:49160;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
3. Nós reiniciamos o servidor nginx
```
$: sudo systemctl restart nginx
```
