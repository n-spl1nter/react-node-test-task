import { useMutation } from 'react-query';
import { QueryKeys } from '@/shared/constants';
import { api, Endpoints } from '@/api';
import { useRouter } from 'next/router';
import { routes } from '@/shared/routes';

export const useSignOut = () => {
    const router = useRouter();
    return useMutation(
        [QueryKeys.signOut],
        () => api.post(Endpoints.signOut),
        {
            onSuccess: () => {
                router.push(routes.login);
            }
        }
    );
}
