"use client"; 

import { useEffect, useState } from 'react';

interface NasaNotification {
    messageId: string;
    messageType: string;
    messageIssueTime: string;
    messageURL: string;
    messageBody: string;
}

export default function SpaceAlerts() {
    const [notifications, setNotifications] = useState<NasaNotification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
    const API_URL = "https://orbitguardplatform.onrender.com/api/nasa/notifications";

    async function fetchSpaceData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
        throw new Error("Erro ao carregar os dados do servidor.");
        }
        
        // 3. Tipando a resposta do JSON
        const data: NasaNotification[] = await response.json();
        setNotifications(data); 
        } catch (error) {
        console.error("Erro na conexão com o back-end:", error);
        } finally {
        setLoading(false);
        }
    }

    fetchSpaceData();
    }, []);

    if (loading) return <p>Carregando alertas espaciais da NASA...</p>;

    return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h2>🌌 Alertas Cósmicos Recentes</h2>
        <div className="grid">
        {notifications.map((item) => (
            <div key={item.messageId} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '8px' }}>
            <h3>Tipo: {item.messageType}</h3>
            <p><strong>Data de Emissão:</strong> {new Date(item.messageIssueTime).toLocaleString()}</p>
            <p>{item.messageBody}</p>
            <a href={item.messageURL} target="_blank" rel="noreferrer">Ver relatório oficial da NASA</a>
            </div>
        ))}
        </div>
    </div>
    );
}