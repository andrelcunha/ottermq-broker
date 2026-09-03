import { api } from "$lib/services/api";
export interface ExchangeData {
    "vhost": string,
    "name": string,
    "type": string,
    "durable": boolean,
    "auto_delete": boolean,
    "internal": boolean
}

export async function getExchanges(): Promise<ExchangeData[] | null> {
    try {
        const response = await api.get('/api/exchanges')
        const data = await response.json();
        return Array.isArray(data?.exchanges) ? data.exchanges : null;
    } catch (err) {
        console.error('Failed to fetch: ', err)
    }
    return null;
}