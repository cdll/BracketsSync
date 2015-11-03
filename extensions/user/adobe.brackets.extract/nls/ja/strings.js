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
	"MENU_CC_SIGN_IN": "Creative Cloud にサインイン\u2026",
	"MENU_CC_SIGN_OUT": "ログアウト ({0})",
	"MENU_HELP_ONLINE": "Extract for Brackets オンラインヘルプ",
	"MENU_HELP_TUTORIAL": "Extract for Brackets チュートリアルを開く",

        // EULA
	"EULA_DIALOG_TITLE": "Extract for Brackets (Preview) ソフトウェア使用許諾契約",
	"EULA_HEADER": "アドビソフトウェア使用許諾契約はお客様がご使用の Extract for Brackets (Preview) の機能のみに適用され、Brackets 全般について規定するものではありません。同意しない場合は、Extract for Brackets (Preview) を使用できません。Brackets は MIT ライセンスによって提供されており、継続して使用できます。Brackets の使用は使用許諾契約への同意を必要としません。",
        "EULA_CONTENT":                     licenseText,
	"EULA_OPT_OUT_NOTICE": "<span class='dialog-notice-header strong'>使用統計情報</span><br>Extract for Brackets 品質向上のため、アドビでは、お客様のエクステンションの使用方法に関する<strong>匿名の</strong>データを定期的に送信しています。Extract パネルで <span class=\"e4b-settings-icon\"/> アイコンをクリックし、「匿名の使用統計情報を送信」設定を変更することで、環境設定をいつでも変更できます。<a href=\"{PRIVACY_URL}\">詳細情報</a>",
	"TERMS_OF_USE": "利用条件",

	"EULA_BTN_ACCEPT": "同意する",
	"EULA_BTN_DECLINE": "同意しない",

	"EXPLORE_EXTRACT_FOR_BRACKETS": "Extract for Brackets (Preview)",

	"FIRSTLAUNCH_POPUP_MSG": "Extract for Brackets (Preview) を<br>開始するにはここをクリック。<br>",
	"GOT_IT": "開始",

	"CALL_TO_ACTION_TITLE": "Extract は <strong>Creative Cloud</strong> サービスです",
	"CALL_TO_ACTION_MESSAGE": "Adobe ID でサインインすると、PSD をアップロードしたり、既にアップロード済みの PSD を参照してデザインの情報やアセットの抽出を開始したりすることができます。",
	"CALL_TO_ACTION_BUTTON": "無料でサインイン\u2026",

        // Commands
	"SHOW_EXTRACT_FOR_BRACKETS": "Extract for Brackets (Preview) を表示",
	"RESET_TO_FIRST_LAUNCH": "Extract for Brackets を起動前の状態にリセット",
	"CMD_GUIDED_TUTORIAL": "Extract for Brackets チュートリアル",

	"MORE_INFO": "詳細情報...",

	"OPEN_A_PSD": "自身の PSD を使用",
	"SHOW_HIDE_LAYERS": "レイヤーパネルの表示切り替え",
        
	"TOOLBAR_HIDE": "非表示",
	"TOOLBAR_HIDE_HINT": "今すぐ始める",
	"TOOLBAR_OR": "または",
	"GET_STARTED": "PSD を開く\u2026",
	"GET_STARTED_DESCRIPTION": "Adobe ID でサインインすると、PSD をアップロードしたり、既にアップロード済みの PSD を参照してデザインの情報やアセットの抽出を開始したりすることができます。",
	"SIGN_UP": "アカウントを持っていない場合",
	"SIGN_UP_LINK": "無料のアカウントを取得します。",

	"UNSUPPORTED_BLEND_MODES": "サポートされていない描画モードが含まれています。レンダリング結果が異なる場合があります。",

	"HINTS_HEADSUP": "CSS ルール内にカーソルを置いて、PSD に関連するコードヒントを表示します。",

	"CSS_ALL_FONT_STYLES": "すべてのフォントスタイル",

	"EXTRACT_INVALID_CHARS": "無効なファイル名です : {0}<br>ファイル名に無効な文字 (<code>{1}</code> など) や文字シーケンスは使用できません。",
	"EXTRACT_ALREADY_EXISTS": "{0} <span class='dialog-filename'>{1}</span> は既に存在しています。",
	"EXTRACT_UNABLE_TO_WRITE": "{0} を <span class='dialog-filename'>{1}</span> として書き込めません。<br>{2}",
	"EXTRACT_BEFORE_RENAME": "画像を抽出するには、以下の操作を実行します。<ol><li>パスを編集してファイル名/場所を選択</li><li>拡張子 .JPG、.PNG または .SVG を使用</li><li>Enter キーを押してダウンロード</li></ol>必要に応じて、新しいフォルダーを作成します。",
	"EXTRACT_AFTER_RENAME": "<p class='callout-download-status'>アセットを抽出中\u2026</p><p>別のファイルの種類または名前を生成するには、コードヒントを再度使用してください。</p>",
	"EXTRACT_DOWNLOADING_STATUS": "アセット「{0}」を抽出中\u2026",
	"EXTRACT_DOWNLOAD_COMPLETE": "完了!",
	"EXTRACT_ASSET": "アセットを抽出\u2026",
        
        // Preferences
	"PREF_DIALOG_TITLE": "環境設定",
	"PREF_PRIVACY_TITLE": "使用統計情報",
	"PREF_PRIVACY_MESSAGE": "Extract for Brackets 品質向上のため、アドビでは、お客様のエクステンションの使用方法に関する<strong>匿名の</strong>データを定期的に送信しています。<a href=\"{PRIVACY_URL}\">詳細情報</a>",
	"PREF_PRIVACY_CHECKBOX_LABEL": "はい、Extract for Brackets エクステンションの使用方法に関する情報を共有します。",
        
        // SUSI Modal Interstitial
	"SUSI_LOADING_WINDOW_TITLE": "Adobe ID",
	"SUSI_LOADING_BASE": "読み込み中\u2026",
	"SUSI_LOADING_AUTHORIZE": "Adobe IDを読み込み中\u2026",
	"SUSI_LOADING_CHECK_STATUS": "Adobe IDを確認中\u2026",
	"SUSI_LOADING_CHECK_TOKEN": "Adobe IDを確認中\u2026",
	"SUSI_LOADING_PROFILE": "プロファイルを読み込み中\u2026",
	"SUSI_LOADING_VALIDATE_TOKEN": "Adobe IDを確認中\u2026",
	"SUSI_LOADING_LOGOUT": "サインアウト中\u2026",

        // Buttons
	"CANCEL": "キャンセル",
	"DONE": "完了",
	"CLOSE": "閉じる",

        // Error messages
	"SVG_NOT_AVAILABLE": "このレイヤーを SVG として書き出すことができません",
	"STATIC_CONTENT_SVG_NOT_AVAILABLE": "このデモ PSD はまだ SVG を書き込めません。このデモに JPG または PNG を使用するか、自身の PSD をアップロードしてください。",
	"OFFLINE_ERROR": "Creative Cloud へのアクセス中にエラーが発生しました。",
	"SERVICE_ERROR": "Creative Cloud へのアクセス中にエラーが発生しました : {0}。やり直しますか？",
	"STATIC_CONTENT_SERVICE_ERROR": "このデモ PSD ではまだレイヤーを結合できません。自身の PSD をアップロードして、再試行してください。",
	"FILE_FORMAT_ERROR": "サポートされていないファイル形式です : {0}",
	"NO_VISIBLE_LAYERS_ERROR": "表示レイヤーがありません。画像を抽出するには、表示レイヤーを選択してください。",
	"ERROR_OFFLINE_MESSAGE_SIGN_IN": "サインイン",
	"ERROR_OFFLINE_MESSAGE_SIGN_UP": "サインアップ",
	"ERROR_OFFLINE_MESSAGE_SIGN_OUT": "サインアウト",
	"ERROR_OFFLINE_MESSAGE": "{0}するには、インターネットに接続してください。",
	"ERROR_OFFLINE_USE_CACHE_MESSAGE": "オフライン時に、キャッシュファイル、CSS の値、計測値、および単一レイヤーの画像抽出へのアクセスが制限されていました。",
	"ERROR_RENDER_TITLE": "ファイルの表示中にエラーが発生しました",
	"ERROR_RENDER_MESSAGE": "ファイル <span class='dialog-filename'>{0}</span> を表示する際にエラーが発生しました。",
	"ERROR_ASSET_LIST_MESSAGE": "フォルダー <span class='dialog-filename'>{0}</span> を表示する際にエラーが発生しました。",

        // Override ccweb
	"Drag and Drop a PSD here": "アップロードするには PSD ファイルをここにドラッグ",
	"Upload PSD": "PSD をアップロード",
	"UPLOADING": "アップロード中",
	"PROCESSING": "処理中",
        
        // help callout
	"NEXT": "次へ",
	"GUIDED_TUTORIAL_1": "レイヤーを選択して Extract for Brackets を開始します。",
	"GUIDED_TUTORIAL_2": "CSS または画像を抽出するには、CSS ルール内にカーソルを置いて入力を開始してください (または Ctrl キーを押しながらスペースキーを押してください)。",
	"GUIDED_TUTORIAL_3": "複数のレイヤーを Shift キーを押しながらクリックして選択し、オブジェクト間の距離を測定します。",
	"GUIDED_TUTORIAL_4": "自身のコンテンツで Extract を使用する準備ができたら、これらのオプションのいずれかを選択します。"
    };
});
