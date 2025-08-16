'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState, useEffect } from 'react';

gsap.registerPlugin(useGSAP);

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasVisited, setHasVisited] = useState(false);

    useEffect(() => {
        // Vérifier si l'utilisateur a déjà visité le site
        const visited = localStorage.getItem('portfolio-visited');
        
        if (!visited) {
            // Première visite - afficher le preloader
            setIsVisible(true);
            // Marquer comme visité
            localStorage.setItem('portfolio-visited', 'true');
        } else {
            // Déjà visité - ne pas afficher le preloader
            setHasVisited(true);
        }
    }, []);

    useGSAP(
        () => {
            if (!isVisible) return;

            const tl = gsap.timeline({
                defaults: {
                    ease: 'power1.inOut',
                },
            });

            tl.to('.name-text span', {
                y: 0,
                stagger: 0.05,
                duration: 0.2,
            });

            tl.to('.preloader-item', {
                delay: 1,
                y: '100%',
                duration: 0.5,
                stagger: 0.1,
            })
                .to('.name-text span', { autoAlpha: 0 }, '<0.5')
                .to(
                    preloaderRef.current,
                    {
                        autoAlpha: 0,
                    },
                    '<1',
                )
                .call(() => {
                    // Supprimer complètement le Preloader du DOM après l'animation
                    setIsVisible(false);
                });
        },
        { scope: preloaderRef, dependencies: [isVisible] },
    );

    // Ne pas rendre le composant s'il n'est plus visible ou s'il a déjà visité
    if (!isVisible || hasVisited) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[6] flex" ref={preloaderRef}>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>
            <div className="preloader-item h-full w-[10%] bg-black"></div>

            <p className="name-text flex text-[20vw] lg:text-[200px] font-anton text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none overflow-hidden">
                <span className="inline-block translate-y-full">S</span>
                <span className="inline-block translate-y-full">A</span>
                <span className="inline-block translate-y-full">M</span>
                <span className="inline-block translate-y-full">E</span>
                <span className="inline-block translate-y-full">N</span>
            </p>
        </div>
    );
};

export default Preloader;
