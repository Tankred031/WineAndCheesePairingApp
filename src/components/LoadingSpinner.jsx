import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import useLoading from '../hooks/useLoading';

export default function LoadingSpinner() {
    const { loading, message } = useLoading();

    if (!loading) return null;

    return (
        <>
            {loading && (
                <div className='loading-spinner-overlay'>

                    <div className='loading-content'>
                    <DotLottieReact
                    src="/bottle.lottie"
                    loop
                    autoplay
                    style= {{ width: 120, height: 120 }} />
                    
                        <p className='loading-text'>{message}</p>
                    </div>
                </div>
            )}
        </>
    );
}