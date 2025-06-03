import { useQuery } from '@tanstack/react-query';

import { handleRequest, httpRequest } from '@/utils/httpRequest';

type Method = 'get' | 'post' | 'patch' | 'put' | 'delete';

type UseFetchParams = {
  url: string;
  type?: Method;
  data?: Record<string, unknown>;
  options?: Record<string, unknown>;
  enabled?: boolean;
};

export const useFetch = ({ url, type = 'get', data, options = {}, enabled = true }: UseFetchParams) => {
  return useQuery({
    queryKey: [url, type, data, options],
    queryFn: () =>
      handleRequest(
        type === 'get' ? httpRequest.get(url, { params: data, ...options }) : httpRequest[type](url, data, options),
      ),
    enabled,
  });
};
