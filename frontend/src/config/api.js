import axios from 'axios';

const normalizeBaseUrl = (value) => value?.replace(/\/$/, '');

const developmentBaseUrl = normalizeBaseUrl(process.env.REACT_APP_BASE_URL);
const productionBaseUrl = normalizeBaseUrl(process.env.REACT_APP_API_URL) || developmentBaseUrl;
const fallbackBaseUrl = normalizeBaseUrl(process.env.REACT_APP_API_URL);

export const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? productionBaseUrl
    : developmentBaseUrl || productionBaseUrl;

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const shouldRetryWithFallback =
            process.env.NODE_ENV === 'development' &&
            fallbackBaseUrl &&
            developmentBaseUrl &&
            fallbackBaseUrl !== developmentBaseUrl &&
            !error.response &&
            error.config &&
            !error.config.__isFallbackRequest;

        if (!shouldRetryWithFallback) {
            return Promise.reject(error);
        }

        return apiClient({
            ...error.config,
            __isFallbackRequest: true,
            baseURL: fallbackBaseUrl,
        });
    }
);