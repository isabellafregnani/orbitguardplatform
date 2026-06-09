"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Calendar, ExternalLink, Loader2 } from "lucide-react";

interface NasaNotification {
    messageId: string;
    messageType: string;
    messageIssueTime: string;
    messageURL: string;
    messageBody: string;
}

const typeLabels: Record<string, string> = {
    IPS: "Particula Energetica Interplanetaria",
    CME: "Ejecao de Massa Coronal",
    GST: "Tempestade Geomagnetica",
    FLR: "Explosao Solar",
    SEP: "Particulas Energeticas Solares",
    MPC: "Cometa proximo ao Sol",
    RBE: "Evento de Cinturao de Radiacao",
    HSS: "Fluxo de Alta Velocidade",
    WSAEnlilSimulations: "Simulacao WSA-Enlil",
};

function getTypeLabel(type: string) {
    return typeLabels[type] ?? "Alerta Espacial";
}

function getShortSummary(text: string) {
    const normalized = text.replace(/\s+/g, " ").trim();

    if (normalized.length <= 200) {
        return normalized;
    }

    return `${normalized.slice(0, 197)}...`;
}

function PageShell({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen bg-background px-4 py-10 text-foreground">
            <section className="mx-auto max-w-6xl">{children}</section>
        </main>
    );
}

function PageHeader() {
    return (
        <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                NASA DONKI
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
                Alertas Cósmicos Recentes
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                Últimos eventos espaciais publicados pela NASA, resumidos para consulta rápida.
            </p>
        </div>
    );
}

export default function SpaceAlerts() {
    const [notifications, setNotifications] = useState<NasaNotification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const API_URL = `https://api.nasa.gov/DONKI/notifications?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`;
    async function fetchSpaceData() {
    try {
        setError(null);
        const response = await fetch(API_URL);
        if (!response.ok) {
        throw new Error("Erro ao carregar os dados do servidor.");
        }

        const data: NasaNotification[] = await response.json();
        setNotifications(data);
        } catch (error) {
        console.error("Erro na conexão com o back-end:", error);
        setError("Não foi possível carregar os alertas da NASA agora. Tente novamente em alguns instantes.");
        } finally {
        setLoading(false);
        }
    }

    fetchSpaceData();
    }, []);

    if (loading) {
        return (
            <PageShell>
                <PageHeader />
                <div className="rounded-xl border border-border/60 bg-card p-6 shadow-xl">
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <span>Carregando alertas espaciais da NASA...</span>
                    </div>
                </div>
            </PageShell>
        );
    }

    if (error) {
        return (
            <PageShell>
                <PageHeader />
                <div className="rounded-xl border border-destructive/30 bg-card p-6 shadow-xl">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="mt-0.5 h-5 w-5 text-destructive" />
                        <div>
                            <h2 className="font-display text-lg font-semibold text-foreground">
                                Não conseguimos carregar os alertas
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
                        </div>
                    </div>
                </div>
            </PageShell>
        );
    }

    const visibleNotifications = notifications.slice(0, 10);

    return (
    <PageShell>
        <PageHeader />

        <div className="grid gap-4 md:grid-cols-2">
        {visibleNotifications.map((item) => (
            <article
                key={item.messageId}
                className="rounded-xl border border-border/60 bg-card p-5 shadow-xl transition-colors hover:border-primary/40"
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <span className="inline-flex rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                            {getTypeLabel(item.messageType)}
                        </span>
                        <h2 className="mt-3 font-display text-lg font-semibold text-foreground">
                            {item.messageType}
                        </h2>
                    </div>
                    <AlertTriangle className="h-5 w-5 shrink-0 text-accent" />
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-4 w-4 text-secondary" />
                    <span>{new Date(item.messageIssueTime).toLocaleString("pt-BR")}</span>
                </div>

                <p className="mt-4 overflow-hidden wrap-break-words text-sm leading-6 text-muted-foreground">
                    {getShortSummary(item.messageBody)}
                </p>

                <a
                    href={item.messageURL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg gradient-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                    Ver relatório oficial da NASA
                    <ExternalLink className="h-4 w-4" />
                </a>
            </article>
        ))}
        </div>
    </PageShell>
    );
}
