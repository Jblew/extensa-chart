FROM jedrzejlewandowski/schemaver-check:1.2.0 AS schemaVerCheck

FROM golang:1.17-alpine AS gucci
RUN GOBIN=/bin/ CGO_ENABLED=0 go install github.com/noqcks/gucci@1.5.0

FROM node:14 AS builder
WORKDIR /app
ADD package* /app/
RUN npm ci
ADD babel.config.js package* tsconfig.json /app/
ADD src /app/src
RUN npm run build

FROM caddy:2-alpine
WORKDIR /srv
COPY --from=schemaVerCheck /bin/schemaver-check /bin/schemaver-check
COPY --from=gucci /bin/gucci /bin/gucci
COPY --from=builder /app/dist/* /srv/
ADD public/schema.json /srv/
ADD public/mocks /srv/mocks
ADD Caddyfile.template /etc/caddy/Caddyfile.template

ENV BACKEND_BASE_URL=/backend/
ENV SCHEMAVERCHECK_SCHEMA_FILE=/srv/schema.json
CMD ["/bin/sh", "-c", "\
    schemaver-check --data-file /srv/mocks/pie.json --definition-name \"Chart\" && \
    schemaver-check --data-file /srv/mocks/progress.json --definition-name \"Chart\" && \
    gucci /etc/caddy/Caddyfile.template > /etc/caddy/Caddyfile && \
    cat /etc/caddy/Caddyfile && \
    caddy run --config /etc/caddy/Caddyfile --adapter caddyfile \
    "]