// ======================================
// 第五人格 BAN / PICK 管理システム
// ======================================


// ======================================
// HTML要素
// ======================================

const setupScreen = document.getElementById("setupScreen");
const banPickScreen = document.getElementById("banPickScreen");

const boNumber = document.getElementById("boNumber");
const startMatch = document.getElementById("startMatch");

const matchTitle = document.getElementById("matchTitle");
const gameTitle = document.getElementById("gameTitle");

const phaseTitle = document.getElementById("phaseTitle");
const phaseDescription = document.getElementById("phaseDescription");

const selectionStatus = document.getElementById("selectionStatus");
const characterList = document.getElementById("characterList");

const backButton = document.getElementById("backButton");
const resetButton = document.getElementById("resetButton");


// ======================================
// サバイバー
// ======================================

const survivors = [
    "幸運児",
    "医師",
    "弁護士",
    "泥棒",
    "庭師",
    "マジシャン",
    "冒険家",
    "傭兵",
    "空軍",
    "祭司",
    "機械技師",
    "オフェンス",
    "心眼",
    "調香師",
    "カウボーイ",
    "踊り子",
    "占い師",
    "納棺師",
    "探鉱者",
    "呪術師",
    "野人",
    "曲芸師",
    "一等航海士",
    "バーメイド",
    "ポストマン",
    "墓守",
    "囚人",
    "昆虫学者",
    "画家",
    "玩具職人",
    "バッツマン",
    "患者",
    "心理学者",
    "小説家",
    "少女",
    "泣きピエロ",
    "教授",
    "骨董商",
    "作曲家",
    "記者",
    "航空エンジニア",
    "応援団",
    "人形師",
    "火災調査員",
    "レディ・ファウロ",
    "騎士",
    "気象学者",
    "弓使い",
    "脱出マスター",
    "幻灯師",
    "闘牛士",
    "マイムアーティスト"
];


// ======================================
// ハンター
// ======================================

const hunters = [
    "復讐者",
    "道化師",
    "断罪狩人",
    "リッパー",
    "結魂者",
    "芸者",
    "白黒無常",
    "写真家",
    "狂眼",
    "黄衣の王",
    "夢の魔女",
    "泣き虫",
    "魔トカゲ",
    "血の女王",
    "ガードNo.26",
    "使徒",
    "ヴァイオリニスト",
    "彫刻師",
    "アンデッド",
    "破輪",
    "漁師",
    "蝋人形師",
    "悪夢",
    "書記官",
    "隠者",
    "夜の番人",
    "オペラ歌手",
    "フールズ・ゴールド",
    "時空の影",
    "足萎えの羊",
    "フラバルー",
    "雑貨商",
    "ビリヤードプレイヤー",
    "女王蜂",
    "歯医者",
    "心の獣"
];


// ======================================
// アプリ状態
// ======================================

let selectedBO = "";

let currentGame = 1;

let currentPhase = 0;

let currentPick = 0;

let selections = [];

let phases = [];


// ======================================
// 保存ボタン作成
// ======================================

const saveButton = document.createElement("button");

saveButton.id = "saveButton";

saveButton.textContent = "保存";

saveButton.style.display = "none";

resetButton.insertAdjacentElement(
    "afterend",
    saveButton
);


// ======================================
// BAN済み表示エリア作成
// ======================================

const bannedArea = document.createElement("div");

bannedArea.id = "bannedArea";

characterList.parentNode.insertBefore(
    bannedArea,
    characterList
);


// ======================================
// html2canvas読み込み
// ======================================

function loadHtml2Canvas() {

    return new Promise(function(resolve, reject) {

        if (window.html2canvas) {

            resolve();

            return;

        }

        const script =
            document.createElement("script");

        script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

        script.onload = function() {

            resolve();

        };

        script.onerror = function() {

            reject(
                new Error(
                    "画像保存用ライブラリの読み込みに失敗しました。"
                )
            );

        };

        document.head.appendChild(script);

    });

}


// ======================================
// BAN/PICKフェーズ作成
// ======================================

function createPhases(game) {


    // ==================================
    // BO1
    // ==================================

    if (selectedBO === "BO1") {

        return [

            {
                title: "サバイバーBAN①",
                description: "サバイバーを2人BAN",
                type: "BAN",
                characterType: "survivor",
                count: 2
            },

            {
                title: "サバイバーPICK①",
                description: "サバイバーを2人PICK",
                type: "PICK",
                characterType: "survivor",
                count: 2
            },

            {
                title: "サバイバーBAN②",
                description: "サバイバーを1人BAN",
                type: "BAN",
                characterType: "survivor",
                count: 1
            },

            {
                title: "サバイバーPICK②",
                description: "サバイバーを1人PICK",
                type: "PICK",
                characterType: "survivor",
                count: 1
            },

            {
                title: "サバイバーBAN③",
                description: "サバイバーを1人BAN",
                type: "BAN",
                characterType: "survivor",
                count: 1
            },

            {
                title: "サバイバーPICK③",
                description: "サバイバーを1人PICK",
                type: "PICK",
                characterType: "survivor",
                count: 1
            },

            {
                title: "ハンターPICK",
                description: "ハンターを1人PICK",
                type: "PICK",
                characterType: "hunter",
                count: 1
            }

        ];

    }


    // ==================================
    // BO2～BO5
    // ==================================

    let survivorBan;


    if (game === 1) {

        survivorBan = 0;

    } else if (game === 2) {

        survivorBan = 1;

    } else {

        survivorBan = 2;

    }


    return [

        {
            title: "ハンターBAN①",
            description: "サバイバーを2人BAN",
            type: "BAN",
            characterType: "survivor",
            count: 2
        },

        {
            title: "サバイバーBAN",
            description:
                "ハンターを" +
                survivorBan +
                "人BAN",
            type: "BAN",
            characterType: "hunter",
            count: survivorBan
        },

        {
            title: "サバイバーPICK①",
            description: "サバイバーを2人PICK",
            type: "PICK",
            characterType: "survivor",
            count: 2
        },

        {
            title: "ハンターBAN②",
            description: "サバイバーを1人BAN",
            type: "BAN",
            characterType: "survivor",
            count: 1
        },

        {
            title: "サバイバーPICK②",
            description: "サバイバーを1人PICK",
            type: "PICK",
            characterType: "survivor",
            count: 1
        },

        {
            title: "ハンターBAN③",
            description: "サバイバーを1人BAN",
            type: "BAN",
            characterType: "survivor",
            count: 1
        },

        {
            title: "サバイバーPICK③",
            description: "サバイバーを1人PICK",
            type: "PICK",
            characterType: "survivor",
            count: 1
        },

        {
            title: "ハンターPICK",
            description: "ハンターを1人PICK",
            type: "PICK",
            characterType: "hunter",
            count: 1
        }

    ];

}


// ======================================
// 試合開始
// ======================================

startMatch.addEventListener(
    "click",
    function() {

        if (boNumber.value === "") {

            alert(
                "BO1～BO5を選択してください。"
            );

            return;

        }

        selectedBO =
            boNumber.value;

        currentGame = 1;

        currentPhase = 0;

        currentPick = 0;

        selections = [];

        phases =
            createPhases(currentGame);

        setupScreen.style.display =
            "none";

        banPickScreen.style.display =
            "block";

        saveButton.style.display =
            "none";

        updateScreen();

    }
);


// ======================================
// 画面更新
// ======================================

function updateScreen() {

    const phase =
        phases[currentPhase];


    if (!phase) {

        finishGame();

        return;

    }


    matchTitle.textContent =
        selectedBO;


    gameTitle.textContent =
        "第" +
        currentGame +
        "ゲーム";


    phaseTitle.textContent =
        phase.title;


    phaseDescription.textContent =
        phase.description;


    selectionStatus.textContent =
        (currentPick + 1) +
        " / " +
        phase.count;


    // BAN済みキャラクターを表示
    showBannedCharacters();


    // キャラクター表示
    showCharacters(phase);

}


// ======================================
// BAN済みキャラクター表示
// ======================================

function showBannedCharacters() {

    bannedArea.innerHTML = "";


    const bannedCharacters =
        selections.filter(
            function(selection) {

                return (
                    selection.type === "BAN"
                );

            }
        );


    const title =
        document.createElement("h3");

    title.textContent =
        "BAN済みキャラクター";

    bannedArea.appendChild(title);


    if (
        bannedCharacters.length === 0
    ) {

        const none =
            document.createElement("p");

        none.textContent =
            "まだBANされていません";

        none.style.color =
            "#999999";

        bannedArea.appendChild(none);

        return;

    }


    bannedCharacters.forEach(
        function(selection) {

            const item =
                document.createElement("div");

            item.textContent =
                "🚫 " +
                selection.character;

            item.style.display =
                "inline-block";

            item.style.margin =
                "4px";

            item.style.padding =
                "8px 12px";

            item.style.background =
                "#3a1515";

            item.style.border =
                "1px solid #aa3333";

            item.style.borderRadius =
                "8px";

            item.style.color =
                "#ff7777";

            bannedArea.appendChild(item);

        }
    );

}


// ======================================
// キャラクター表示
// ======================================

function showCharacters(phase) {

    characterList.innerHTML = "";


    let list;


    if (
        phase.characterType ===
        "survivor"
    ) {

        list = survivors;

    } else {

        list = hunters;

    }


    list.forEach(
        function(character) {


            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                character;


            // ==================================
            // すでに選択されたキャラを確認
            // ==================================

            const alreadySelected =
                selections.some(
                    function(selection) {

                        return (
                            selection.character ===
                            character &&
                            selection.characterType ===
                            phase.characterType
                        );

                    }
                );


            // BAN済み・PICK済みは選択不可
            if (alreadySelected) {

                button.disabled =
                    true;

                button.style.opacity =
                    "0.35";

                button.style.cursor =
                    "not-allowed";

            } else {

                button.addEventListener(
                    "click",
                    function() {

                        selectCharacter(
                            character
                        );

                    }
                );

            }


            characterList.appendChild(
                button
            );

        }
    );

}


// ======================================
// キャラクター選択
// ======================================

function selectCharacter(character) {

    const phase =
        phases[currentPhase];


    // すでに選択されていないか確認
    const alreadySelected =
        selections.some(
            function(selection) {

                return (
                    selection.character ===
                    character &&
                    selection.characterType ===
                    phase.characterType
                );

            }
        );


    if (alreadySelected) {

        alert(
            "このキャラクターはすでに選択されています。"
        );

        return;

    }


    selections.push({

        game:
            currentGame,

        phase:
            phase.title,

        type:
            phase.type,

        characterType:
            phase.characterType,

        character:
            character

    });


    currentPick++;


    if (
        currentPick >=
        phase.count
    ) {

        currentPhase++;

        currentPick = 0;

    }


    if (
        currentPhase >=
        phases.length
    ) {

        finishGame();

        return;

    }


    updateScreen();

}


// ======================================
// ゲーム終了
// ======================================

function finishGame() {

    phaseTitle.textContent =
        "BAN / PICK 完了";


    phaseDescription.textContent =
        "第" +
        currentGame +
        "ゲームのBAN/PICKが完了しました。";


    selectionStatus.innerHTML =
        "";


    characterList.innerHTML =
        "";


    bannedArea.innerHTML =
        "";


    selections.forEach(
        function(selection) {


            const result =
                document.createElement(
                    "p"
                );


            result.textContent =
                selection.phase +
                " ： " +
                selection.character;


            selectionStatus.appendChild(
                result
            );

        }
    );


    // 保存ボタン表示
    saveButton.style.display =
        "inline-block";

}


// ======================================
// 保存ボタン
// ======================================

saveButton.addEventListener(
    "click",
    async function() {

        try {

            saveButton.disabled =
                true;

            saveButton.textContent =
                "保存中...";


            await loadHtml2Canvas();


            backButton.setAttribute(
                "data-html2canvas-ignore",
                "true"
            );

            resetButton.setAttribute(
                "data-html2canvas-ignore",
                "true"
            );

            saveButton.setAttribute(
                "data-html2canvas-ignore",
                "true"
            );


            const canvas =
                await html2canvas(
                    banPickScreen,
                    {
                        backgroundColor:
                            "#151515",

                        scale:
                            2,

                        useCORS:
                            true,

                        logging:
                            false
                    }
                );


            backButton.removeAttribute(
                "data-html2canvas-ignore"
            );

            resetButton.removeAttribute(
                "data-html2canvas-ignore"
            );

            saveButton.removeAttribute(
                "data-html2canvas-ignore"
            );


            const blob =
                await new Promise(
                    function(resolve) {

                        canvas.toBlob(
                            resolve,
                            "image/png"
                        );

                    }
                );


            if (!blob) {

                throw new Error(
                    "画像の作成に失敗しました。"
                );

            }


            const file =
                new File(
                    [
                        blob
                    ],
                    "第五人格_BANPICK_" +
                    selectedBO +
                    ".png",
                    {
                        type:
                            "image/png"
                    }
                );


            // iPhoneの共有機能
            if (
                navigator.share &&
                navigator.canShare &&
                navigator.canShare(
                    {
                        files:
                            [file]
                    }
                )
            ) {

                await navigator.share(
                    {
                        title:
                            "第五人格 BAN/PICK",

                        text:
                            selectedBO +
                            " 第" +
                            currentGame +
                            "ゲーム",

                        files:
                            [file]
                    }
                );

            } else {

                // PCなど
                const url =
                    URL.createObjectURL(
                        blob
                    );


                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    url;


                link.download =
                    "第五人格_BANPICK_" +
                    selectedBO +
                    ".png";


                document.body.appendChild(
                    link
                );


                link.click();


                document.body.removeChild(
                    link
                );


                URL.revokeObjectURL(
                    url
                );


                alert(
                    "画像を保存しました。"
                );

            }


        } catch (error) {

            console.error(error);


            alert(
                "画像を保存できませんでした。\n" +
                "もう一度試してください。"
            );

        }


        saveButton.disabled =
            false;

        saveButton.textContent =
            "保存";

    }
);


// ======================================
// 1つ戻す
// ======================================

backButton.addEventListener(
    "click",
    function() {

        if (
            selections.length === 0
        ) {

            return;

        }


        selections.pop();


        currentPhase = 0;

        currentPick = 0;


        selections.forEach(
            function() {

                const phase =
                    phases[currentPhase];


                currentPick++;


                if (
                    currentPick >=
                    phase.count
                ) {

                    currentPhase++;

                    currentPick = 0;

                }

            }
        );


        updateScreen();

    }
);


// ======================================
// 試合リセット
// ======================================

resetButton.addEventListener(
    "click",
    function() {

        const result =
            confirm(
                "試合を最初からやり直しますか？"
            );


        if (!result) {

            return;

        }


        selectedBO = "";

        currentGame = 1;

        currentPhase = 0;

        currentPick = 0;

        selections = [];

        phases = [];


        banPickScreen.style.display =
            "none";


        setupScreen.style.display =
            "block";


        boNumber.value =
            "";


        saveButton.style.display =
            "none";


        bannedArea.innerHTML =
            "";

    }
);