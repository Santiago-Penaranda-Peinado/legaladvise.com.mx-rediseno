# Usar una imagen oficial de Node.js como base
FROM node:20-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Exponer el puerto por defecto de Vite
EXPOSE 5173

# Exponer el puerto para host mapping opcional
ENV HOST=0.0.0.0

# Comando por defecto (se sobrescribirá en docker-compose en desarrollo)
CMD ["npm", "run", "dev"]
