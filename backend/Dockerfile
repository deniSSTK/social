FROM golang:1.24-alpine AS builder
WORKDIR /app

COPY backend/go.mod ./go.mod
RUN go mod download

COPY backend/. ./
RUN CGO_ENABLED=0 GOOS=linux go build -o server ./cmd/app/main.go

FROM alpine:3.20
WORKDIR /app

RUN apk add --no-cache ca-certificates

COPY --from=builder /app/server ./server
COPY --from=builder /app/internal/infrastructure/db/migrations ./internal/infrastructure/db/migrations

EXPOSE 8080

CMD ["./server"]
