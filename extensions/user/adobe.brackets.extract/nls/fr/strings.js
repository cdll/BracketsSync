/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */

/*
 *
 * Do *NOT* translate the string keys on the left of the colon.  These string
 *    keys *MUST* match the string values inherited from the JS source.
 *
 */

define(["text!./license.html"], function (licenseText) {
    "use strict";
    
    return {
	"EXTENSION_NAME": "Extract for Brackets (Preview)",

        // Menus
	"MENU_CC_SIGN_IN": "Se connecter à Creative Cloud\u2026",
	"MENU_CC_SIGN_OUT": "Se déconnecter ({0})",
	"MENU_HELP_ONLINE": "Aide en ligne d’Extract for Brackets",
	"MENU_HELP_TUTORIAL": "Ouvrir le didacticiel Extract for Brackets",

        // EULA
	"EULA_DIALOG_TITLE": "Contrat de licence du logiciel Extract for Brackets (Preview)",
	"EULA_HEADER": "Le contrat de licence du logiciel Adobe couvre uniquement l’utilisation de la fonctionnalité Extract for Brackets (Preview), et non l’application Brackets dans son ensemble. Si vous refusez les conditions de ce contrat, vous ne pourrez pas utiliser Extract for Brackets (Preview). L’application Brackets, qui est couverte par une licence MIT, continuera de fonctionner normalement. L’utilisation de Brackets ne requiert pas l’acceptation d’un contrat de licence.",
        "EULA_CONTENT":                     licenseText,
	"EULA_OPT_OUT_NOTICE": "<span class='dialog-notice-header strong'>Statistiques d’utilisation</span><br>Afin d’améliorer Extract for Brackets, nous envoyons régulièrement des données <strong>anonymes</strong> portant sur la manière dont vous utilisez l’extension. Vous pouvez modifier vos préférences à tout moment dans le panneau Extract en cliquant sur l’icône <span class=\"e4b-settings-icon\"/> et en modifiant le paramètre d’envoi de statistiques d’utilisation anonymes. <a href=\"{PRIVACY_URL}\">En savoir plus</a>.",
	"TERMS_OF_USE": "Conditions d’utilisation",

	"EULA_BTN_ACCEPT": "Accepter",
	"EULA_BTN_DECLINE": "Refuser",

	"EXPLORE_EXTRACT_FOR_BRACKETS": "Extract for Brackets (Preview)",

	"FIRSTLAUNCH_POPUP_MSG": "Cliquez ici pour commencer<br>à utiliser Extract for Brackets (Preview).<br>",
	"GOT_IT": "Compris !",

	"CALL_TO_ACTION_TITLE": "Extract est un service de <strong>Creative Cloud</strong>",
	"CALL_TO_ACTION_MESSAGE": "Une fois connecté avec votre Adobe ID, vous pouvez télécharger un PSD ou voir les PSD déjà téléchargés, et commencer l’extraction des informations et des ressources relatives à la conception.",
	"CALL_TO_ACTION_BUTTON": "Connectez-vous gratuitement\u2026",

        // Commands
	"SHOW_EXTRACT_FOR_BRACKETS": "Afficher Extract for Brackets (Preview)",
	"RESET_TO_FIRST_LAUNCH": "Extract for Brackets réinitialisé selon les paramètres du premier lancement",
	"CMD_GUIDED_TUTORIAL": "Didacticiel Extract for Brackets",

	"MORE_INFO": "Plus d’infos...",

	"OPEN_A_PSD": "Utiliser votre propre PSD",
	"SHOW_HIDE_LAYERS": "Activer/Désactiver le panneau Calques",
        
	"TOOLBAR_HIDE": "Masquer",
	"TOOLBAR_HIDE_HINT": "Commencer",
	"TOOLBAR_OR": "ou",
	"GET_STARTED": "Ouvrir un PSD\u2026",
	"GET_STARTED_DESCRIPTION": "Une fois connecté avec votre Adobe ID, vous pouvez télécharger un PSD ou voir les PSD déjà téléchargés, et commencer l’extraction des informations et des ressources relatives à la conception.",
	"SIGN_UP": "Vous n’avez pas de compte ?",
	"SIGN_UP_LINK": "Créez-vous un compte gratuit.",

	"UNSUPPORTED_BLEND_MODES": "Votre fichier comporte des modes de fusion non pris en charge. Cela risque de nuire à la qualité du rendu.",

	"HINTS_HEADSUP": "Placez le curseur à l’intérieur d’une règle CSS pour voir les indicateurs de code associés à votre PSD.",

	"CSS_ALL_FONT_STYLES": "Tous les styles de police",

	"EXTRACT_INVALID_CHARS": "Nom de fichier non valide : {0}<br>Le nom de fichier ne peut pas comporter de caractères non autorisés (par exemple : <code>{1}</code>) ni de séquences de caractères.",
	"EXTRACT_ALREADY_EXISTS": "Le {0} <span class='dialog-filename'>{1}</span> existe déjà.",
	"EXTRACT_UNABLE_TO_WRITE": "Impossible d’enregistrer ce {0} sous <span class='dialog-filename'>{1}</span>.<br>{2}",
	"EXTRACT_BEFORE_RENAME": "Pour extraire une image :<ol><li>Modifiez le chemin d’accès en fonction de l’emplacement et du nom de fichier souhaités</li><li>Utilisez une extension .JPG, .PNG ou .SVG</li><li>Appuyez sur ENTREE pour lancer le téléchargement</li></ol>Si nécessaire, de nouveaux dossiers sont créés.",
	"EXTRACT_AFTER_RENAME": "<p class='callout-download-status'>Extraction de l’actif\u2026</p><p>Pour générer un autre nom ou type de fichier, utilisez à nouveau les indicateurs de code.</p>",
	"EXTRACT_DOWNLOADING_STATUS": "Extraction de l’actif « {0} »\u2026",
	"EXTRACT_DOWNLOAD_COMPLETE": "Terminé !",
	"EXTRACT_ASSET": "Extraire un actif\u2026",
        
        // Preferences
	"PREF_DIALOG_TITLE": "Préférences",
	"PREF_PRIVACY_TITLE": "Statistiques d’utilisation",
	"PREF_PRIVACY_MESSAGE": "Afin d’améliorer Extract for Brackets, nous envoyons régulièrement des données <strong>anonymes</strong> portant sur la manière dont vous utilisez l’extension. <a href=\"{PRIVACY_URL}\">En savoir plus</a>.",
	"PREF_PRIVACY_CHECKBOX_LABEL": "Oui, je souhaite partager des données portant sur mon utilisation de l’extension Extract for Brackets.",
        
        // SUSI Modal Interstitial
	"SUSI_LOADING_WINDOW_TITLE": "Adobe ID",
	"SUSI_LOADING_BASE": "Chargement\u2026",
	"SUSI_LOADING_AUTHORIZE": "Chargement de l’Adobe ID\u2026",
	"SUSI_LOADING_CHECK_STATUS": "Vérification de l’Adobe ID\u2026",
	"SUSI_LOADING_CHECK_TOKEN": "Vérification de l’Adobe ID\u2026",
	"SUSI_LOADING_PROFILE": "Chargement du profil\u2026",
	"SUSI_LOADING_VALIDATE_TOKEN": "Vérification de l’Adobe ID\u2026",
	"SUSI_LOADING_LOGOUT": "Déconnexion\u2026",

        // Buttons
	"CANCEL": "Annuler",
	"DONE": "Terminé",
	"CLOSE": "Fermer",

        // Error messages
	"SVG_NOT_AVAILABLE": "Impossible d’exporter ce calque au format SVG",
	"STATIC_CONTENT_SVG_NOT_AVAILABLE": "Ce PSD de démonstration ne permet pas d’exporter des fichiers SVG. Utilisez le format JPG ou PNG pour cette démo, ou bien chargez votre propre PSD.",
	"OFFLINE_ERROR": "Erreur d’accès à Creative Cloud.",
	"SERVICE_ERROR": "Erreur d’accès à Creative Cloud : {0}. Réessayer ?",
	"STATIC_CONTENT_SERVICE_ERROR": "Ce PSD de démonstration ne permet pas de fusionner des calques. Chargez votre propre PSD et réessayez.",
	"FILE_FORMAT_ERROR": "Format de fichier non pris en charge : {0}",
	"NO_VISIBLE_LAYERS_ERROR": "Aucun calque visible. Pour extraire une image, choisissez des calques visibles.",
	"ERROR_OFFLINE_MESSAGE_SIGN_IN": "vous connecter",
	"ERROR_OFFLINE_MESSAGE_SIGN_UP": "S’inscrire",
	"ERROR_OFFLINE_MESSAGE_SIGN_OUT": "vous déconnecter",
	"ERROR_OFFLINE_MESSAGE": "Pour {0}, connectez-vous à Internet.",
	"ERROR_OFFLINE_USE_CACHE_MESSAGE": "Quand vous êtes hors ligne, vous disposez d’un accès limité aux fichiers mis en cache, aux valeurs du code CSS, aux valeurs de mesure et à la fonction d’extraction d’image de calque unique.",
	"ERROR_RENDER_TITLE": "Erreur d’affichage du fichier",
	"ERROR_RENDER_MESSAGE": "Une erreur s’est produite lors de la tentative d’affichage du fichier <span class='dialog-filename'>{0}</span>.",
	"ERROR_ASSET_LIST_MESSAGE": "Une erreur s’est produite lors de la tentative d’affichage du dossier <span class='dialog-filename'>{0}</span>.",

        // Override ccweb
	"Drag and Drop a PSD here": "Faites glisser les fichiers PSD à charger ici",
	"Upload PSD": "Télécharger un fichier PSD",
	"UPLOADING": "CHARGEMENT EN COURS",
	"PROCESSING": "TRAITEMENT EN COURS",
        
        // help callout
	"NEXT": "Suivant",
	"GUIDED_TUTORIAL_1": "Sélectionnez un calque pour commencer à utiliser Extract for Brackets.",
	"GUIDED_TUTORIAL_2": "Pour extraire le code CSS ou les images, commencez à taper (ou appuyez sur Ctrl+Espace) après avoir placé le curseur à l’intérieur d’une règle CSS.",
	"GUIDED_TUTORIAL_3": "Cliquez tout en maintenant la touche Maj enfoncée pour sélectionner plusieurs calques et mesurer la distance entre deux objets.",
	"GUIDED_TUTORIAL_4": "Une fois que vous êtes prêt à utiliser Extract avec vos propres fichiers, choisissez l’une des options suivantes."
    };
});
