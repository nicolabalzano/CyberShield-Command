import React from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const LevelCompleted = ({ 
    stars = 0, 
    maxStars = 3,
    completionTime = 0,
    additionalStats = [],
    levelTitle = '',
    completionMessage = '',
    onContinue
}) => {
    const navigate = useNavigate();
    const { language } = useLanguage();

    const defaultTitle = language === 'italiano' ? 'COMPLETATO!' : 
                         language === 'francais' ? 'TERMINÉ!' :
                         language === 'deutsch' ? 'ABGESCHLOSSEN!' :
                         language === 'espanol' ? '¡COMPLETADO!' : 'COMPLETE!';

    const defaultMessage = language === 'italiano' ? 'Hai completato il livello! Ritorno alla mappa...' : 
                           language === 'francais' ? 'Vous avez terminé le niveau! Retour à la carte...' :
                           language === 'deutsch' ? 'Level abgeschlossen! Zurück zur Karte...' :
                           language === 'espanol' ? '¡Has completado el nivel! Volviendo al mapa...' : 
                           'Level complete! Returning to map...';

    const missionReportTitle = language === 'italiano' ? 'RAPPORTO MISSIONE' : 
                                language === 'francais' ? 'RAPPORT DE MISSION' :
                                language === 'deutsch' ? 'MISSIONSBERICHT' :
                                language === 'espanol' ? 'INFORME DE MISIÓN' : 'MISSION REPORT';

    const timeElapsedLabel = language === 'italiano' ? 'Tempo impiegato:' : 
                              language === 'francais' ? 'Temps écoulé:' :
                              language === 'deutsch' ? 'Benötigte Zeit:' :
                              language === 'espanol' ? 'Tiempo empleado:' : 'Time elapsed:';

    const starsEarnedLabel = language === 'italiano' ? 'Stelle guadagnate:' : 
                              language === 'francais' ? 'Étoiles gagnées:' :
                              language === 'deutsch' ? 'Sterne verdient:' :
                              language === 'espanol' ? 'Estrellas ganadas:' : 'Stars earned:';

    const continueLabel = language === 'italiano' ? 'PROSEGUI' : 
                          language === 'francais' ? 'CONTINUER' :
                          language === 'deutsch' ? 'WEITER' :
                          language === 'espanol' ? 'CONTINUAR' : 'CONTINUE';

    const handleContinue = () => {
        if (onContinue) {
            onContinue();
        } else {
            navigate('/map');
        }
    };

    return createPortal(
        <div className="fixed inset-0 bg-cyber-black/90 flex items-center justify-center z-[9999]">
            <div className="text-center p-6 border border-cyber-green rounded-lg bg-cyber-black max-w-md">
                {/* Title */}
                <div className="text-3xl font-bold text-cyber-green mb-3">
                    ✓ {defaultTitle}
                </div>
                
                {/* Subtitle Message */}
                <div className="text-sm text-cyber-green/70 mb-4">
                    {completionMessage || (levelTitle ? `Hai completato ${levelTitle}! Ritorno alla mappa...` : defaultMessage)}
                </div>
                
                {/* Detailed Report */}
                <div className="border-t border-cyber-green/30 pt-4 text-left space-y-2">
                    <div className="text-xs font-bold text-cyber-blue mb-2">
                        {missionReportTitle}
                    </div>
                    
                    <div className="space-y-1 text-[10px]">
                        {/* Completion Time */}
                        {completionTime > 0 && (
                            <div className="flex justify-between">
                                <span className="text-cyber-green/70">{timeElapsedLabel}</span>
                                <span className="text-cyber-blue font-bold">{completionTime}s</span>
                            </div>
                        )}
                        
                        {/* Additional Stats */}
                        {additionalStats.map((stat, index) => (
                            <div key={index} className="flex justify-between">
                                <span className="text-cyber-green/70">{stat.label}:</span>
                                <span className={`font-bold ${stat.color || 'text-cyber-blue'}`}>
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                        
                        {/* Stars Earned */}
                        <div className="flex justify-between">
                            <span className="text-cyber-green/70">{starsEarnedLabel}</span>
                            <span className="text-cyber-green font-bold">{stars}/{maxStars}</span>
                        </div>
                    </div>
                </div>
                
                {/* Continue Button */}
                <button 
                    onClick={handleContinue}
                    className="mt-4 px-6 py-2 border-2 border-cyber-green bg-cyber-green/10 hover:bg-cyber-green/30 text-cyber-green font-bold text-sm rounded transition-all shadow-lg shadow-cyber-green/20"
                >
                    {continueLabel}
                </button>
            </div>
        </div>,
        document.body
    );
};

export default LevelCompleted;
