/**
 * Sound Mound Playground - 完整真实数据
 * 精确的角度定位 (archAngle) 适配优化后的彩虹
 */

import type { Phoneme, Word, PracticeTask } from '../types/models';

export const shortVowels: Phoneme[] = [
    {
        id: 'short_a',
        ipa: '/æ/',
        displayName: 'Short A',
        category: 'short_vowels',
        level: 1,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'a_apple', phonemeId: 'short_a', displayText: 'a', position: 'initial', ruleText: '短元音 a 可以出现在单词开头，读音为 /æ/。', chantText: 'Here we have the short a,\nDo you see the apple?\na – apple - /a/', exampleWord: 'apple', archAngle: 165 },
            { id: 'a_cat', phonemeId: 'short_a', displayText: 'a', position: 'medial', ruleText: '短元音 a 出现在辅音之间时，读音为 /æ/。', chantText: 'Here we have the short a,\nI just found my pet cat!\na — cat - /a/', exampleWord: 'cat', archAngle: 90 },
            { id: 'au_laugh', phonemeId: 'short_a', displayText: 'au', position: 'medial', ruleText: '在 laugh 这种特殊单词中，au 发短 a 的音。', chantText: 'Did you hear that loud laugh?\nau – laugh - /a/', exampleWord: 'laugh', archAngle: 15, isHeartPart: true },
        ],
    },
    {
        id: 'short_e',
        ipa: '/ɛ/',
        displayName: 'Short E',
        category: 'short_vowels',
        level: 1,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'e_egg', phonemeId: 'short_e', displayText: 'e', position: 'initial', ruleText: '短元音 e 可以出现在单词开头。', chantText: 'Here we have the short e,\nThe bird\'s beginning is an egg,\ne – egg – /e/', exampleWord: 'egg', archAngle: 165 },
            { id: 'e_bed', phonemeId: 'short_e', displayText: 'e', position: 'medial', ruleText: '短元音 e 出现在单词中间。', chantText: 'Here we have the short e,\nI\'m in the middle of my bed!\ne - bed - /e/', exampleWord: 'bed', archAngle: 115 },
            { id: 'ea_bread', phonemeId: 'short_e', displayText: 'ea', position: 'medial', ruleText: '双元音字母组合 ea 在 bread 等词中发短音 /e/。源于中古英语，需要记忆。', chantText: 'In the morning, I will eat some bread.\nea – bread - /e/', exampleWord: 'bread', archAngle: 65, isHeartPart: true },
            { id: 'ai_said', phonemeId: 'short_e', displayText: 'ai', position: 'medial', ruleText: '在常用词 said 中，ai 发短音 /e/。这是不规则拼写，需要记忆。', chantText: 'Did you hear what I said?\nai - said - /e/', exampleWord: 'said', archAngle: 15, isHeartPart: true },
        ],
    },
    {
        id: 'short_i',
        ipa: '/ɪ/',
        displayName: 'Short I',
        category: 'short_vowels',
        level: 1,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'i_igloo', phonemeId: 'short_i', displayText: 'i', position: 'initial', ruleText: '短元音 i 可以出现在单词开头。', chantText: 'Here we have the short i,\nLook at that little igloo!\ni – igloo – /i/', exampleWord: 'igloo', archAngle: 135 },
            { id: 'i_pig', phonemeId: 'short_i', displayText: 'i', position: 'medial', ruleText: '短元音 i 出现在单词中间。', chantText: 'Here we have the short i,\nSee that cute little pig!\ni - pig - /i/', exampleWord: 'pig', archAngle: 45 },
        ],
    },
    {
        id: 'short_o',
        ipa: '/ɒ/',
        displayName: 'Short O',
        category: 'short_vowels',
        level: 1,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'o_octopus', phonemeId: 'short_o', displayText: 'o', position: 'initial', ruleText: '短元音 o 可以出现在单词开头。', chantText: 'Here we have the short o,\nLook at that octopus!\no – octopus – /o/', exampleWord: 'octopus', archAngle: 135 },
            { id: 'o_fox', phonemeId: 'short_o', displayText: 'o', position: 'medial', ruleText: '短元音 o 出现在单词中间。', chantText: 'Here we have the short o,\nSee the clever fox!\no - fox - /o/', exampleWord: 'fox', archAngle: 45 },
        ],
    },
    {
        id: 'short_u',
        ipa: '/ʌ/',
        displayName: 'Short U',
        category: 'short_vowels',
        level: 1,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'u_umbrella', phonemeId: 'short_u', displayText: 'u', position: 'initial', ruleText: '短元音 u 可以出现在单词开头。', chantText: 'Here we have the short u,\nDon\'t forget your umbrella!\nu – umbrella – /u/', exampleWord: 'umbrella', archAngle: 150 },
            { id: 'u_gum', phonemeId: 'short_u', displayText: 'u', position: 'medial', ruleText: '短元音 u 出现在单词中间。', chantText: 'Here we have the short u,\nI\'m chewing bubblegum!\nu - gum - /u/', exampleWord: 'gum', archAngle: 90 },
            { id: 'ou_touch', phonemeId: 'short_u', displayText: 'ou', position: 'medial', ruleText: 'ou 在 touch、young 等词中发短音 /u/。源于希腊语，需要记忆。', chantText: 'Can you touch it?\nou – touch - /u/', exampleWord: 'touch', archAngle: 30, isHeartPart: true },
        ],
    },
];

export const longVowels: Phoneme[] = [
    {
        id: 'long_a',
        ipa: '/eɪ/',
        displayName: 'Long A',
        category: 'long_vowels',
        level: 3,
        backgroundColor: '#FCE4EC',
        graphemes: [
            { id: 'a_e_cake', phonemeId: 'long_a', displayText: 'a-e', position: 'medial', ruleText: '魔法 e 让中间的元音变长（cake）。', chantText: 'Here we have the long a, cake - /ā/', exampleWord: 'cake', archAngle: 165 },
            { id: 'ai_rain', phonemeId: 'long_a', displayText: 'ai', position: 'medial', ruleText: 'ai 组合常在词中（rain）。', chantText: 'Look outside it\'s going to rain!\nai - rain - /ā/', exampleWord: 'rain', archAngle: 144 },
            { id: 'ei_reindeer', phonemeId: 'long_a', displayText: 'ei', position: 'medial', ruleText: 'ei 在 reindeer 中发长 a 音。', chantText: 'There\'s a reindeer! ei - reindeer - /ā/', exampleWord: 'reindeer', archAngle: 123, isHeartPart: true },
            { id: 'ea_steak', phonemeId: 'long_a', displayText: 'ea', position: 'medial', ruleText: '三个特例单词之一 (steak, great, break)。', chantText: 'I just ate a yummy steak! ea – steak - /ā/', exampleWord: 'steak', archAngle: 102, isHeartPart: true },
            { id: 'eigh_eight', phonemeId: 'long_a', displayText: 'eigh', position: 'medial', ruleText: 'eigh 在 eight, weight 等词中。', chantText: 'How old are you? eight - /ā/', exampleWord: 'eight', archAngle: 81, isHeartPart: true },
            { id: 'a_acorn', phonemeId: 'long_a', displayText: 'a', position: 'initial', ruleText: 'a 在开音节首位读长音。', chantText: 'Have you found a large acorn? a - /ā/', exampleWord: 'acorn', archAngle: 60, isOpenSyllable: true },
            { id: 'ay_pay', phonemeId: 'long_a', displayText: 'ay', position: 'final', ruleText: 'ay 组合在词尾读长音。', chantText: 'Make sure you go to pay! ay - /ā/', exampleWord: 'pay', archAngle: 39 },
            { id: 'ey_they', phonemeId: 'long_a', displayText: 'ey', position: 'final', ruleText: 'ey 在词尾发长音 /ā/ (they, grey)。', chantText: 'Did you see where they were going? ey - /ā/', exampleWord: 'they', archAngle: 15, isHeartPart: true },
        ],
    },
    {
        id: 'long_e',
        ipa: '/iː/',
        displayName: 'Long E',
        category: 'long_vowels',
        level: 3,
        backgroundColor: '#FCE4EC',
        graphemes: [
            { id: 'e_e_athlete', phonemeId: 'long_e', displayText: 'e-e', position: 'medial', ruleText: '使用 e-e (魔法e) 表示 long e。', chantText: 'Here we have the long e!\ne-e - athlete - /ē/', exampleWord: 'athlete', archAngle: 165 },
            { id: 'ee_feet', phonemeId: 'long_e', displayText: 'ee', position: 'medial', ruleText: '双元音组合 ee 发长音 /i:/。', chantText: 'Do you smell the feet? ee - /ē/', exampleWord: 'feet', archAngle: 144 },
            { id: 'ea_leaf', phonemeId: 'long_e', displayText: 'ea', position: 'medial', ruleText: '双元音组合 ea 常发长音 /i:/。', chantText: 'Did you see the leaf? ea – /ē/', exampleWord: 'leaf', archAngle: 123 },
            { id: 'e_me', phonemeId: 'long_e', displayText: 'e', position: 'final', ruleText: '短单词词尾的 e 读长音。', chantText: 'Come on and follow me! e - /ē/', exampleWord: 'me', archAngle: 102 },
            { id: 'y_candy', phonemeId: 'long_e', displayText: 'y', position: 'final', ruleText: '多音节词尾的 y 读长音 /i:/。', chantText: 'Please don\'t eat my candy! y – /ē/', exampleWord: 'candy', archAngle: 81 },
            { id: 'ey_key', phonemeId: 'long_e', displayText: 'ey', position: 'final', ruleText: 'ey 在词尾读长音 (key, money)。', chantText: 'Don\'t forget the key! ey - /ē/', exampleWord: 'key', archAngle: 60 },
            { id: 'ie_grief', phonemeId: 'long_e', displayText: 'ie', position: 'medial', ruleText: 'ie 组合发长音 /i:/。源于法语，可记忆"i before e"规则。', chantText: 'I\'m so sad... ie - grief – /ē/', exampleWord: 'grief', archAngle: 39, isHeartPart: true },
            { id: 'ei_protein', phonemeId: 'long_e', displayText: 'ei', position: 'medial', ruleText: 'ei 组合在 c 后面发长音 /i:/。', chantText: 'Eat your protein! ei - /ē/', exampleWord: 'protein', archAngle: 15, isHeartPart: true },
        ],
    },
    {
        id: 'long_i',
        ipa: '/aɪ/',
        displayName: 'Long I',
        category: 'long_vowels',
        level: 3,
        backgroundColor: '#FCE4EC',
        graphemes: [
            { id: 'i_e_ride', phonemeId: 'long_i', displayText: 'i-e', position: 'medial', ruleText: '魔法 e 让中间的 i 变长。', chantText: 'Here we have the long i!\ni-e - ride - /ī/', exampleWord: 'ride', archAngle: 165 },
            { id: 'i_spider', phonemeId: 'long_i', displayText: 'i', position: 'initial', ruleText: '开音节中 i 读长音。', chantText: 'Look at that spider!\ni - spider - /ī/', exampleWord: 'spider', archAngle: 140, isOpenSyllable: true },
            { id: 'y_fly', phonemeId: 'long_i', displayText: 'y', position: 'final', ruleText: '单音节词尾 y 读长音 /ī/。', chantText: 'Watch the butterfly fly!\ny - fly - /ī/', exampleWord: 'fly', archAngle: 115 },
            { id: 'igh_light', phonemeId: 'long_i', displayText: 'igh', position: 'medial', ruleText: 'igh 组合，gh 不发音。词尾多接 t。', chantText: 'Turn on the light!\nigh - light - /ī/', exampleWord: 'light', archAngle: 90 },
            { id: 'y_e_type', phonemeId: 'long_i', displayText: 'y-e', position: 'medial', ruleText: 'y 也可以用魔法 e 变长。', chantText: 'What type is it?\ny-e - type - /ī/', exampleWord: 'type', archAngle: 65 },
            { id: 'ie_pie', phonemeId: 'long_i', displayText: 'ie', position: 'final', ruleText: 'ie 在词尾读长音 /ī/。', chantText: 'I want a piece of pie!\nie - pie - /ī/', exampleWord: 'pie', archAngle: 40 },
            { id: 'uy_buy', phonemeId: 'long_i', displayText: 'uy', position: 'final', ruleText: 'uy 在词尾发长音（较少见）。', chantText: 'I want to buy it!\nuy - buy - /ī/', exampleWord: 'buy', archAngle: 15, isHeartPart: true },
        ],
    },
    {
        id: 'long_o',
        ipa: '/oʊ/',
        displayName: 'Long O',
        category: 'long_vowels',
        level: 3,
        backgroundColor: '#FCE4EC',
        graphemes: [
            { id: 'o_e_home', phonemeId: 'long_o', displayText: 'o-e', position: 'medial', ruleText: '魔法 e 让中间的 o 变长。', chantText: 'Here we have the long o!\no-e - home - /ō/', exampleWord: 'home', archAngle: 165 },
            { id: 'o_go', phonemeId: 'long_o', displayText: 'o', position: 'final', ruleText: '开音节词尾 o 读长音。', chantText: 'Let\'s go!\no - go - /ō/', exampleWord: 'go', archAngle: 140, isOpenSyllable: true },
            { id: 'oa_boat', phonemeId: 'long_o', displayText: 'oa', position: 'medial', ruleText: 'oa 组合在词中。', chantText: 'Row the boat!\noa - boat - /ō/', exampleWord: 'boat', archAngle: 115 },
            { id: 'ow_snow', phonemeId: 'long_o', displayText: 'ow', position: 'final', ruleText: 'ow 在词尾读长音（也可能读 /aʊ/）。', chantText: 'Look at the snow!\now - snow - /ō/', exampleWord: 'snow', archAngle: 90 },
            { id: 'oe_toe', phonemeId: 'long_o', displayText: 'oe', position: 'final', ruleText: 'oe 在词尾读长音（较少见）。', chantText: 'I hurt my toe!\noe - toe - /ō/', exampleWord: 'toe', archAngle: 65 },
            { id: 'o_piano', phonemeId: 'long_o', displayText: 'o', position: 'medial', ruleText: '开音节中的 o 读长音。', chantText: 'Play the piano!\no - piano - /ō/', exampleWord: 'piano', archAngle: 40, isOpenSyllable: true },
        ],
    },
    {
        id: 'long_u_yoo',
        ipa: '/juː/',
        displayName: 'Long U (/yoo/)',
        category: 'long_vowels',
        level: 3,
        backgroundColor: '#FCE4EC',
        graphemes: [
            { id: 'u_e_cute', phonemeId: 'long_u_yoo', displayText: 'u-e', position: 'medial', ruleText: '魔法 e 让 u 发 /yoo/ 音。', chantText: 'That kitten is so cute!\nu-e - cute - /yoo/', exampleWord: 'cute', archAngle: 150 },
            { id: 'u_music', phonemeId: 'long_u_yoo', displayText: 'u', position: 'medial', ruleText: '开音节中的 u 发 /yoo/。', chantText: 'Listen to the music!\nu - music - /yoo/', exampleWord: 'music', archAngle: 110, isOpenSyllable: true },
            { id: 'ue_rescue', phonemeId: 'long_u_yoo', displayText: 'ue', position: 'final', ruleText: 'ue 在词尾发 /yoo/。', chantText: 'Come to the rescue!\nue - rescue - /yoo/', exampleWord: 'rescue', archAngle: 70 },
            { id: 'ew_few', phonemeId: 'long_u_yoo', displayText: 'ew', position: 'final', ruleText: 'ew 可发 /yoo/ 音。', chantText: 'Just a few more!\new - few - /yoo/', exampleWord: 'few', archAngle: 30 },
        ],
    },
    {
        id: 'long_u_oo',
        ipa: '/uː/',
        displayName: 'Long U (/oo/)',
        category: 'long_vowels',
        level: 3,
        backgroundColor: '#FCE4EC',
        graphemes: [
            { id: 'oo_moon', phonemeId: 'long_u_oo', displayText: 'oo', position: 'medial', ruleText: 'oo 组合发 /oo/ 长音。', chantText: 'Look at the moon!\noo - moon - /oo/', exampleWord: 'moon', archAngle: 160 },
            { id: 'u_e_tube', phonemeId: 'long_u_oo', displayText: 'u-e', position: 'medial', ruleText: 'u-e 在 r/l/j 后发 /oo/。', chantText: 'Watch the tube!\nu-e - tube - /oo/', exampleWord: 'tube', archAngle: 130 },
            { id: 'ue_blue', phonemeId: 'long_u_oo', displayText: 'ue', position: 'final', ruleText: 'ue 可发 /oo/ 音。', chantText: 'The sky is blue!\nue - blue - /oo/', exampleWord: 'blue', archAngle: 100 },
            { id: 'ew_new', phonemeId: 'long_u_oo', displayText: 'ew', position: 'final', ruleText: 'ew 可发 /oo/ 音。', chantText: 'Something new!\new - new - /oo/', exampleWord: 'new', archAngle: 70 },
            { id: 'ui_fruit', phonemeId: 'long_u_oo', displayText: 'ui', position: 'medial', ruleText: 'ui 组合发 /oo/ 音。', chantText: 'Eat some fruit!\nui - fruit - /oo/', exampleWord: 'fruit', archAngle: 40, isHeartPart: true },
            { id: 'ou_soup', phonemeId: 'long_u_oo', displayText: 'ou', position: 'medial', ruleText: 'ou 在部分词中发 /oo/。', chantText: 'Have some soup!\nou - soup - /oo/', exampleWord: 'soup', archAngle: 15, isHeartPart: true },
        ],
    },
];

// Consonants（辅音）
export const consonants: Phoneme[] = [
    {
        id: 'b',
        ipa: '/b/',
        displayName: 'b',
        category: 'consonants',
        level: 1,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'b_ball', phonemeId: 'b', displayText: 'b', position: 'initial', ruleText: 'b 发浊闭止音 /b/。', chantText: 'Bounce the ball!\nb - ball - /b/', exampleWord: 'ball', archAngle: 135, voicing: 'voiced' },
            { id: 'bb_rabbit', phonemeId: 'b', displayText: 'bb', position: 'medial', ruleText: '双写辅音 bb 常在短元音后。', chantText: 'See the rabbit!\nbb - rabbit - /b/', exampleWord: 'rabbit', archAngle: 45, voicing: 'voiced' },
        ],
    },
    {
        id: 'k',
        ipa: '/k/',
        displayName: 'k/c',
        category: 'consonants',
        level: 1,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'c_cat', phonemeId: 'k', displayText: 'c', position: 'initial', ruleText: 'c 在 a, o, u 前发 /k/。', chantText: 'I just found my pet cat!\nc - cat - /k/', exampleWord: 'cat', archAngle: 165, voicing: 'unvoiced' },
            { id: 'k_kite', phonemeId: 'k', displayText: 'k', position: 'initial', ruleText: 'k 在 e, i, y 前发 /k/。', chantText: 'Fly the kite!\nk - kite - /k/', exampleWord: 'kite', archAngle: 135, voicing: 'unvoiced' },
            { id: 'ck_duck', phonemeId: 'k', displayText: 'ck', position: 'final', ruleText: 'ck 在短元音后。', chantText: 'Feeding the duck!\nck - duck - /k/', exampleWord: 'duck', archAngle: 105, voicing: 'unvoiced' },
            { id: 'ch_school', phonemeId: 'k', displayText: 'ch', position: 'medial', ruleText: 'ch 在希腊语源词中发 /k/。', chantText: 'Go to school!\nch - school - /k/', exampleWord: 'school', archAngle: 75, isHeartPart: true, voicing: 'unvoiced' },
            { id: 'que_unique', phonemeId: 'k', displayText: 'que', position: 'final', ruleText: 'que 在法语源词中发 /k/。', chantText: 'It is unique!\nque - unique - /k/', exampleWord: 'unique', archAngle: 45, isHeartPart: true, voicing: 'unvoiced' },
        ],
    },
    {
        id: 'd',
        ipa: '/d/',
        displayName: 'd',
        category: 'consonants',
        level: 1,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'd_dog', phonemeId: 'd', displayText: 'd', position: 'initial', ruleText: 'd 发浊闭止音 /d/。', chantText: 'Look at the dog!\nd - dog - /d/', exampleWord: 'dog', archAngle: 150, voicing: 'voiced' },
            { id: 'dd_ladder', phonemeId: 'd', displayText: 'dd', position: 'medial', ruleText: '双写 dd 常在短元音后。', chantText: 'Climb the ladder!\ndd - ladder - /d/', exampleWord: 'ladder', archAngle: 90, voicing: 'voiced' },
            { id: 'ed_played', phonemeId: 'd', displayText: 'ed', position: 'final', ruleText: 'ed 在浊音后发 /d/。', chantText: 'We played all day!\ned - played - /d/', exampleWord: 'played', archAngle: 30, voicing: 'voiced' },
        ],
    },
    {
        id: 'f',
        ipa: '/f/',
        displayName: 'f',
        category: 'consonants',
        level: 1,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'f_fish', phonemeId: 'f', displayText: 'f', position: 'initial', ruleText: 'f 发清擦音 /f/。', chantText: 'Watch the fish!\nf - fish - /f/', exampleWord: 'fish', archAngle: 165, voicing: 'unvoiced' },
            { id: 'ff_cliff', phonemeId: 'f', displayText: 'ff', position: 'final', ruleText: 'ff 常出现在单音节短元音词尾。', chantText: 'Don\'t fall off the cliff!\nff - cliff - /f/', exampleWord: 'cliff', archAngle: 125, voicing: 'unvoiced' },
            { id: 'ph_phone', phonemeId: 'f', displayText: 'ph', position: 'initial', ruleText: 'ph 在希腊语源词中发 /f/。', chantText: 'Ring the phone!\nph - phone - /f/', exampleWord: 'phone', archAngle: 85, voicing: 'unvoiced' },
            { id: 'gh_laugh', phonemeId: 'f', displayText: 'gh', position: 'final', ruleText: 'gh 在词尾有时发 /f/。', chantText: 'Make me laugh!\ngh - laugh - /f/', exampleWord: 'laugh', archAngle: 45, isHeartPart: true, voicing: 'unvoiced' },
        ],
    },
    {
        id: 'g',
        ipa: '/ɡ/',
        displayName: 'g',
        category: 'consonants',
        level: 1,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'g_goat', phonemeId: 'g', displayText: 'g', position: 'initial', ruleText: 'g 发硬音 /g/。', chantText: 'See the goat!\ng - goat - /g/', exampleWord: 'goat', archAngle: 150, voicing: 'voiced' },
            { id: 'gg_egg', phonemeId: 'g', displayText: 'gg', position: 'final', ruleText: '双写 gg (egg, juggling)。', chantText: 'Crack the egg!\ngg - egg - /g/', exampleWord: 'egg', archAngle: 90, voicing: 'voiced' },
            { id: 'gu_guess', phonemeId: 'g', displayText: 'gu', position: 'initial', ruleText: 'gu 在部分词首发硬音 /g/。', chantText: 'Can you guess?\ngu - guess - /g/', exampleWord: 'guess', archAngle: 30, isHeartPart: true, voicing: 'voiced' },
        ],
    },
    {
        id: 'h',
        ipa: '/h/',
        displayName: 'h',
        category: 'consonants',
        level: 1,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'h_hat', phonemeId: 'h', displayText: 'h', position: 'initial', ruleText: 'h 发清喉擦音 /h/。', chantText: 'Put on your hat!\nh - hat - /h/', exampleWord: 'hat', archAngle: 90, voicing: 'unvoiced' },
        ],
    },
    {
        id: 'j',
        ipa: '/dʒ/',
        displayName: 'j',
        category: 'consonants',
        level: 2,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'j_jam', phonemeId: 'j', displayText: 'j', position: 'initial', ruleText: 'j 发浊塞擦音 /j/。', chantText: 'Eat some jam!\nj - jam - /j/', exampleWord: 'jam', archAngle: 165, voicing: 'voiced' },
            { id: 'g_gentle', phonemeId: 'j', displayText: 'g', position: 'initial', ruleText: 'g 在 e, i, y 前可能发软音 /j/。', chantText: 'Be very gentle!\ng - gentle - /j/', exampleWord: 'gentle', archAngle: 125, voicing: 'voiced' },
            { id: 'dge_bridge', phonemeId: 'j', displayText: 'dge', position: 'final', ruleText: 'dge 常在单音节短元音词尾。', chantText: 'Cross the bridge!\ndge - bridge - /j/', exampleWord: 'bridge', archAngle: 85, voicing: 'voiced' },
            { id: 'ge_cage', phonemeId: 'j', displayText: 'ge', position: 'final', ruleText: 'ge 常在长元音或辅音后。', chantText: 'In the cage!\nge - cage - /j/', exampleWord: 'cage', archAngle: 45, voicing: 'voiced' },
        ],
    },
    {
        id: 'l',
        ipa: '/l/',
        displayName: 'l',
        category: 'consonants',
        level: 1,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'l_leaf', phonemeId: 'l', displayText: 'l', position: 'initial', ruleText: 'l 发舌尖边音 /l/。', chantText: 'Leaf on the tree!\nl - leaf - /l/', exampleWord: 'leaf', archAngle: 150, voicing: 'voiced' },
            { id: 'll_bell', phonemeId: 'l', displayText: 'll', position: 'final', ruleText: 'll 常出现在单音节短元音词尾。', chantText: 'Ring the bell!\nll - bell - /l/', exampleWord: 'bell', archAngle: 90, voicing: 'voiced' },
            { id: 'sle_muscle', phonemeId: 'l', displayText: 'le', position: 'final', ruleText: 'le 在词尾常与辅音结合。', chantText: 'Strong muscle!\nle - muscle - /l/', exampleWord: 'muscle', archAngle: 30, isHeartPart: true, voicing: 'voiced' },
        ],
    },
    {
        id: 'm',
        ipa: '/m/',
        displayName: 'm',
        category: 'consonants',
        level: 1,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'm_moon', phonemeId: 'm', displayText: 'm', position: 'initial', ruleText: 'm 发双唇鼻音 /m/。', chantText: 'Look at the moon!\nm - moon - /m/', exampleWord: 'moon', archAngle: 150, voicing: 'voiced' },
            { id: 'mm_hammer', phonemeId: 'm', displayText: 'mm', position: 'medial', ruleText: '双写 mm 常在短元音后。', chantText: 'Hit with a hammer!\nmm - hammer - /m/', exampleWord: 'hammer', archAngle: 90, voicing: 'voiced' },
            { id: 'mb_climb', phonemeId: 'm', displayText: 'mb', position: 'final', ruleText: 'mb 结尾，b 不发音。', chantText: 'Watch me climb!\nmb - climb - /m/', exampleWord: 'climb', archAngle: 30, isHeartPart: true, voicing: 'voiced' },
        ],
    },
    {
        id: 'n',
        ipa: '/n/',
        displayName: 'n',
        category: 'consonants',
        level: 1,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'n_nose', phonemeId: 'n', displayText: 'n', position: 'initial', ruleText: 'n 发舌尖鼻音 /n/。', chantText: 'Touch your nose!\nn - nose - /n/', exampleWord: 'nose', archAngle: 165, voicing: 'voiced' },
            { id: 'nn_dinner', phonemeId: 'n', displayText: 'nn', position: 'medial', ruleText: '双写 nn 常在短元音后。', chantText: 'Eat your dinner!\nnn - dinner - /n/', exampleWord: 'dinner', archAngle: 125, voicing: 'voiced' },
            { id: 'kn_knee', phonemeId: 'n', displayText: 'kn', position: 'initial', ruleText: 'kn 结尾，k 不发音。', chantText: 'Bend your knee!\nkn - knee - /n/', exampleWord: 'knee', archAngle: 85, voicing: 'voiced' },
            { id: 'gn_gnat', phonemeId: 'n', displayText: 'gn', position: 'initial', ruleText: 'gn 结尾，g 不发音。', chantText: 'Fly like a gnat!\ngn - gnat - /n/', exampleWord: 'gnat', archAngle: 45, voicing: 'voiced' },
        ],
    },
    {
        id: 'p',
        ipa: '/p/',
        displayName: 'p',
        category: 'consonants',
        level: 1,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'p_pig', phonemeId: 'p', displayText: 'p', position: 'initial', ruleText: 'p 发清闭止音 /p/。', chantText: 'See the little pig!\np - pig - /p/', exampleWord: 'pig', archAngle: 150, voicing: 'unvoiced' },
            { id: 'pp_apple', phonemeId: 'p', displayText: 'pp', position: 'medial', ruleText: '双写 pp 常在短元音后。', chantText: 'Eat a red apple!\npp - apple - /p/', exampleWord: 'apple', archAngle: 90, voicing: 'unvoiced' },
        ],
    },
    {
        id: 'r',
        ipa: '/r/',
        displayName: 'r',
        category: 'consonants',
        level: 2,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'r_rain', phonemeId: 'r', displayText: 'r', position: 'initial', ruleText: 'r 发齿龈信音 /r/。嘴唇微圆。', chantText: 'Look at the rain!\nr - rain - /r/', exampleWord: 'rain', archAngle: 165, voicing: 'voiced' },
            { id: 'rr_carrot', phonemeId: 'r', displayText: 'rr', position: 'medial', ruleText: '双写 rr 常在短元音后。', chantText: 'Eat a carrot!\nrr - carrot - /r/', exampleWord: 'carrot', archAngle: 105, voicing: 'voiced' },
            { id: 'wr_write', phonemeId: 'r', displayText: 'wr', position: 'initial', ruleText: 'wr 结尾，w 不发音。', chantText: 'Watch me write!\nwr - write - /r/', exampleWord: 'write', archAngle: 45, voicing: 'voiced' },
        ],
    },
    {
        id: 's',
        ipa: '/s/',
        displayName: 's',
        category: 'consonants',
        level: 1,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 's_sun', phonemeId: 's', displayText: 's', position: 'initial', ruleText: 's 发清齿擦音 /s/。', chantText: 'The sun is hot!\ns - sun - /s/', exampleWord: 'sun', archAngle: 170, voicing: 'unvoiced' },
            { id: 'ss_glass', phonemeId: 's', displayText: 'ss', position: 'final', ruleText: 'ss 常出现在单音节短元音词尾。', chantText: 'Drink from a glass!\nss - glass - /s/', exampleWord: 'glass', archAngle: 140, voicing: 'unvoiced' },
            { id: 'c_city', phonemeId: 's', displayText: 'c', position: 'initial', ruleText: 'c 在 e, i, y 前发软音 /s/。', chantText: 'Go to the city!\nc - city - /s/', exampleWord: 'city', archAngle: 110, voicing: 'unvoiced' },
            { id: 'sc_scene', phonemeId: 's', displayText: 'sc', position: 'initial', ruleText: 'sc 在部分词中发 /s/ 音。', chantText: 'What a beautiful scene!\nsc - scene - /s/', exampleWord: 'scene', archAngle: 80, isHeartPart: true, voicing: 'unvoiced' },
            { id: 'st_castle', phonemeId: 's', displayText: 'st', position: 'medial', ruleText: 'st 在部分词中 t 不发音。', chantText: 'Living in a castle!\nst - castle - /s/', exampleWord: 'castle', archAngle: 50, isHeartPart: true, voicing: 'unvoiced' },
            { id: 'ps_psychic', phonemeId: 's', displayText: 'ps', position: 'initial', ruleText: 'ps 源于希腊语，p 不发音。', chantText: 'The psychic is here!\nps - psychic - /s/', exampleWord: 'psychic', archAngle: 20, isHeartPart: true, voicing: 'unvoiced' },
        ],
    },
    {
        id: 't',
        ipa: '/t/',
        displayName: 't',
        category: 'consonants',
        level: 1,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 't_tiger', phonemeId: 't', displayText: 't', position: 'initial', ruleText: 't 发清闭止音 /t/。', chantText: 'Look at the tiger!\nt - tiger - /t/', exampleWord: 'tiger', archAngle: 150, voicing: 'unvoiced' },
            { id: 'tt_mitten', phonemeId: 't', displayText: 'tt', position: 'medial', ruleText: '双写 tt 常在短元音后。', chantText: 'Put on your mitten!\ntt - mitten - /t/', exampleWord: 'mitten', archAngle: 90, voicing: 'unvoiced' },
            { id: 'ed_walked', phonemeId: 't', displayText: 'ed', position: 'final', ruleText: 'ed 在清音后发 /t/。', chantText: 'We walked to town!\ned - walked - /t/', exampleWord: 'walked', archAngle: 30, voicing: 'unvoiced' },
        ],
    },
    {
        id: 'v',
        ipa: '/v/',
        displayName: 'v',
        category: 'consonants',
        level: 2,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'v_van', phonemeId: 'v', displayText: 'v', position: 'initial', ruleText: 'v 发浊擦音 /v/。', chantText: 'Drive the van!\nv - van - /v/', exampleWord: 'van', archAngle: 150, voicing: 'voiced' },
            { id: 've_dove', phonemeId: 'v', displayText: 've', position: 'final', ruleText: '英语单词末尾不用 v，需加 e。', chantText: 'See the white dove!\nve - dove - /v/', exampleWord: 'dove', archAngle: 50, voicing: 'voiced' },
        ],
    },
    {
        id: 'w',
        ipa: '/w/',
        displayName: 'w',
        category: 'consonants',
        level: 1,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'w_wagon', phonemeId: 'w', displayText: 'w', position: 'initial', ruleText: 'w 发唇软颚近音 /w/。嘴唇圆收。', chantText: 'Pull the wagon!\nw - wagon - /w/', exampleWord: 'wagon', archAngle: 135, voicing: 'voiced' },
            { id: 'wh_whale', phonemeId: 'w', displayText: 'wh', position: 'initial', ruleText: 'wh 组合在部分方言中发清音，现多发 /w/。', chantText: 'The big blue whale!\nwh - whale - /w/', exampleWord: 'whale', archAngle: 45, voicing: 'voiced' },
        ],
    },
    {
        id: 'x',
        ipa: '/ks/',
        displayName: 'x',
        category: 'consonants',
        level: 2,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'x_fox', phonemeId: 'x', displayText: 'x', position: 'final', ruleText: 'x 发 /ks/ 或 /gz/ 音。', chantText: 'See the red fox!\nx - fox - /ks/', exampleWord: 'fox', archAngle: 90, voicing: 'unvoiced' },
        ],
    },
    {
        id: 'y',
        ipa: '/j/',
        displayName: 'y',
        category: 'consonants',
        level: 2,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'y_yo-yo', phonemeId: 'y', displayText: 'y', position: 'initial', ruleText: 'y 发硬颚近音 /j/。', chantText: 'Play with a yo-yo!\ny - yo-yo - /j/', exampleWord: 'yo-yo', archAngle: 90, voicing: 'voiced' },
        ],
    },
    {
        id: 'z',
        ipa: '/z/',
        displayName: 'z',
        category: 'consonants',
        level: 2,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'z_zebra', phonemeId: 'z', displayText: 'z', position: 'initial', ruleText: 'z 发浊齿擦音 /z/。', chantText: 'See the zebra!\nz - zebra - /z/', exampleWord: 'zebra', archAngle: 165, voicing: 'voiced' },
            { id: 'zz_buzz', phonemeId: 'z', displayText: 'zz', position: 'final', ruleText: 'zz 常出现在单音节短元音词尾。', chantText: 'Hear the bee buzz!\nzz - buzz - /z/', exampleWord: 'buzz', archAngle: 135, voicing: 'voiced' },
            { id: 's_nose', phonemeId: 'z', displayText: 's', position: 'final', ruleText: 's 在两个元音之间常发 /z/。', chantText: 'Touch your nose!\ns - nose - /z/', exampleWord: 'nose', archAngle: 105, voicing: 'voiced' },
            { id: 'es_dishes', phonemeId: 'z', displayText: 'es', position: 'final', ruleText: '名词复数 es 在咝音后发 /iz/。', chantText: 'Wash the dishes!\nes - dishes - /z/', exampleWord: 'dishes', archAngle: 75, voicing: 'voiced' },
            { id: 'ze_freeze', phonemeId: 'z', displayText: 'ze', position: 'final', ruleText: 'ze 在词尾表示 /z/。', chantText: 'It is starting to freeze!\nze - freeze - /z/', exampleWord: 'freeze', archAngle: 45, voicing: 'voiced' },
        ],
    },
    {
        id: 'qu',
        ipa: '/kw/',
        displayName: 'qu',
        category: 'consonants',
        level: 2,
        backgroundColor: '#E3F2FD',
        graphemes: [
            { id: 'qu_queen', phonemeId: 'qu', displayText: 'qu', position: 'initial', ruleText: 'q 后面总跟着 u，发 /kw/ 音。', chantText: 'A beautiful queen!\nqu - queen - /kw/', exampleWord: 'queen', archAngle: 90, voicing: 'unvoiced' },
        ],
    },
    {
        id: 'y_vowel_i',
        ipa: '/aɪ/',
        displayName: 'y (Long I)',
        category: 'consonants',
        level: 3,
        backgroundColor: '#FCE4EC',
        graphemes: [
            { id: 'y_fly', phonemeId: 'y_vowel_i', displayText: 'y', position: 'final', ruleText: '在单音节词尾，y 发长 I 音 /aɪ/。', chantText: 'Watch the fly!\ny - fly - /ī/', exampleWord: 'fly', archAngle: 90 },
        ],
    },
    {
        id: 'y_vowel_e',
        ipa: '/iː/',
        displayName: 'y (Long E)',
        category: 'consonants',
        level: 3,
        backgroundColor: '#FCE4EC',
        graphemes: [
            { id: 'y_candy', phonemeId: 'y_vowel_e', displayText: 'y', position: 'final', ruleText: '在多音节词尾，y 发长 E 音 /iː/。', chantText: 'Do you want some candy?\ny - candy - /ē/', exampleWord: 'candy', archAngle: 90 },
        ],
    },
];

export const digraphs: Phoneme[] = [
    {
        id: 'sh',
        ipa: '/ʃ/',
        displayName: 'sh',
        category: 'digraphs',
        level: 2,
        backgroundColor: '#F3E5F5',
        graphemes: [
            { id: 'sh_shell', phonemeId: 'sh', displayText: 'sh', position: 'initial', ruleText: 'sh 出现在词首，嘴唇微微噘起，气流从舌尖推出。', chantText: 'Did you find a shell?\nsh - shell - /sh/', exampleWord: 'shell', archAngle: 135 },
            { id: 'sh_fish', phonemeId: 'sh', displayText: 'sh', position: 'final', ruleText: 'sh 可出现在词尾。注意区分 -ish 后缀。', chantText: 'That fish is swimming!\nsh - fish - /sh/', exampleWord: 'fish', archAngle: 45 },
        ],
    },
    {
        id: 'ch',
        ipa: '/tʃ/',
        displayName: 'ch',
        category: 'digraphs',
        level: 2,
        backgroundColor: '#F3E5F5',
        graphemes: [
            { id: 'ch_cheese', phonemeId: 'ch', displayText: 'ch', position: 'initial', ruleText: 'ch 出现在词首，舌尖抵住上颚后快速放开。', chantText: 'Do you want some cheese?\nch - cheese - /ch/', exampleWord: 'cheese', archAngle: 150 },
            { id: 'ch_peach', phonemeId: 'ch', displayText: 'ch', position: 'final', ruleText: 'ch 在词尾，用于长元音或辅音后。', chantText: 'That peach looks yummy!\nch - peach - /ch/', exampleWord: 'peach', archAngle: 90 },
            { id: 'tch_hatch', phonemeId: 'ch', displayText: 'tch', position: 'final', ruleText: '-tch 用于短元音后。口诀：短元音后用 tch！', chantText: 'Watch the egg hatch!\ntch - hatch - /ch/', exampleWord: 'hatch', archAngle: 30 },
        ],
    },
    {
        id: 'th_unvoiced',
        ipa: '/θ/',
        displayName: 'th (清音)',
        category: 'digraphs',
        level: 2,
        backgroundColor: '#F3E5F5',
        graphemes: [
            { id: 'th_thin', phonemeId: 'th_unvoiced', displayText: 'th', position: 'initial', ruleText: '清音 th：舌尖放在齿间，只有气流通过（声带不振动）。', chantText: 'That line is so thin!\nth - thin - /th/', exampleWord: 'thin', archAngle: 135, voicing: 'unvoiced' },
            { id: 'th_cloth', phonemeId: 'th_unvoiced', displayText: 'th', position: 'final', ruleText: '清音 th 在词尾。可以把手放在喉咙上感受无振动。', chantText: 'Wipe with the cloth!\nth - cloth - /th/', exampleWord: 'cloth', archAngle: 45, voicing: 'unvoiced' },
        ],
    },
    {
        id: 'th_voiced',
        ipa: '/ð/',
        displayName: 'th (浊音)',
        category: 'digraphs',
        level: 2,
        backgroundColor: '#F3E5F5',
        graphemes: [
            { id: 'th_the', phonemeId: 'th_voiced', displayText: 'th', position: 'initial', ruleText: '浊音 th：舌尖放在齿间，气流通过时声带振动。常见于功能词。', chantText: 'Can you see the cat?\nth - the - /th/', exampleWord: 'the', archAngle: 135, voicing: 'voiced' },
            { id: 'th_bathe', phonemeId: 'th_voiced', displayText: 'th', position: 'final', ruleText: '浊音 th 在词尾，多出现在动词中。', chantText: 'Time to bathe!\nth - bathe - /th/', exampleWord: 'bathe', archAngle: 45, voicing: 'voiced' },
        ],
    },
];

// R-Controlled Vowels（R控制元音）
export const rControlledVowels: Phoneme[] = [
    {
        id: 'ar',
        ipa: '/ɑːr/',
        displayName: 'ar',
        category: 'r_controlled',
        level: 3,
        backgroundColor: '#E8F5E9',
        graphemes: [
            { id: 'ar_star', phonemeId: 'ar', displayText: 'ar', position: 'all', ruleText: 'ar 可出现在词首、词中、词尾。', chantText: 'Look at that star!\nar - star - /ar/', exampleWord: 'star', archAngle: 90 },
        ],
    },
    {
        id: 'er',
        ipa: '/ɜːr/',
        displayName: 'er/ir/ur',
        category: 'r_controlled',
        level: 3,
        backgroundColor: '#E8F5E9',
        graphemes: [
            { id: 'er_her', phonemeId: 'er', displayText: 'er', position: 'final', ruleText: 'er 是最常见的 /er/ 拼写。', chantText: 'Look at her!\ner - her - /er/', exampleWord: 'her', archAngle: 150 },
            { id: 'ir_bird', phonemeId: 'er', displayText: 'ir', position: 'medial', ruleText: 'ir 组合发 /er/ 音。', chantText: 'See the bird!\nir - bird - /er/', exampleWord: 'bird', archAngle: 90 },
            { id: 'ur_burn', phonemeId: 'er', displayText: 'ur', position: 'medial', ruleText: 'ur 组合发 /er/ 音。', chantText: 'Don\'t get a burn!\nur - burn - /er/', exampleWord: 'burn', archAngle: 30 },
        ],
    },
    {
        id: 'or',
        ipa: '/ɔːr/',
        displayName: 'or',
        category: 'r_controlled',
        level: 3,
        backgroundColor: '#E8F5E9',
        graphemes: [
            { id: 'or_corn', phonemeId: 'or', displayText: 'or', position: 'medial', ruleText: 'or 组合发 /or/ 音。', chantText: 'Eat some corn!\nor - corn - /or/', exampleWord: 'corn', archAngle: 135 },
            { id: 'ore_more', phonemeId: 'or', displayText: 'ore', position: 'final', ruleText: 'ore 在词尾。', chantText: 'I want more!\nore - more - /or/', exampleWord: 'more', archAngle: 90 },
            { id: 'oar_board', phonemeId: 'or', displayText: 'oar', position: 'medial', ruleText: 'oar 组合发 /or/。', chantText: 'Write on the board!\noar - board - /or/', exampleWord: 'board', archAngle: 45 },
        ],
    },
];

// Glued Sounds（粘连音）
export const gluedSounds: Phoneme[] = [
    {
        id: 'all',
        ipa: '/ɔːl/',
        displayName: 'all',
        category: 'glued_sounds',
        level: 2,
        backgroundColor: '#FFF3E0',
        graphemes: [
            { id: 'all_ball', phonemeId: 'all', displayText: 'all', position: 'final', ruleText: 'all 在词尾，a 发 /ɔ/ 音。', chantText: 'Throw the ball!\nall - ball - /all/', exampleWord: 'ball', archAngle: 135 },
            { id: 'al_palm', phonemeId: 'all', displayText: 'al', position: 'medial', ruleText: 'al 在词中，a 发 /ɔ/ 音。', chantText: 'See the palm tree!\nal - palm - /all/', exampleWord: 'palm', archAngle: 45 },
        ],
    },
    {
        id: 'ang',
        ipa: '/æŋ/',
        displayName: 'ang',
        category: 'glued_sounds',
        level: 2,
        backgroundColor: '#FFF3E0',
        graphemes: [
            { id: 'ang_bang', phonemeId: 'ang', displayText: 'ang', position: 'final', ruleText: 'ang 结尾，a 与 ng 粘连。', chantText: 'Bang! Bang!\nang - bang - /ang/', exampleWord: 'bang', archAngle: 90 },
        ],
    },
    {
        id: 'ing',
        ipa: '/ɪŋ/',
        displayName: 'ing',
        category: 'glued_sounds',
        level: 2,
        backgroundColor: '#FFF3E0',
        graphemes: [
            { id: 'ing_ring', phonemeId: 'ing', displayText: 'ing', position: 'final', ruleText: 'ing 结尾，常用于动名词。', chantText: 'Look at the ring!\ning - ring - /ing/', exampleWord: 'ring', archAngle: 90 },
        ],
    },
    {
        id: 'ong',
        ipa: '/ɔŋ/',
        displayName: 'ong',
        category: 'glued_sounds',
        level: 2,
        backgroundColor: '#FFF3E0',
        graphemes: [
            { id: 'ong_song', phonemeId: 'ong', displayText: 'ong', position: 'final', ruleText: 'ong 结尾。', chantText: 'Sing a song!\nong - song - /ong/', exampleWord: 'song', archAngle: 90 },
        ],
    },
    {
        id: 'ung',
        ipa: '/ʌŋ/',
        displayName: 'ung',
        category: 'glued_sounds',
        level: 2,
        backgroundColor: '#FFF3E0',
        graphemes: [
            { id: 'ung_lung', phonemeId: 'ung', displayText: 'ung', position: 'final', ruleText: 'ung 结尾。', chantText: 'Use your lung!\nong - lung - /ung/', exampleWord: 'lung', archAngle: 90 },
        ],
    },
    {
        id: 'ank',
        ipa: '/æŋk/',
        displayName: 'ank',
        category: 'glued_sounds',
        level: 2,
        backgroundColor: '#FFF3E0',
        graphemes: [
            { id: 'ank_bank', phonemeId: 'ank', displayText: 'ank', position: 'final', ruleText: 'ank 结尾，a 与 nk 粘连。', chantText: 'Go to the bank!\nank - bank - /ank/', exampleWord: 'bank', archAngle: 90 },
        ],
    },
    {
        id: 'ink',
        ipa: '/ɪŋk/',
        displayName: 'ink',
        category: 'glued_sounds',
        level: 2,
        backgroundColor: '#FFF3E0',
        graphemes: [
            { id: 'ink_pink', phonemeId: 'ink', displayText: 'ink', position: 'final', ruleText: 'ink 结尾。', chantText: 'The color is pink!\nink - pink - /ink/', exampleWord: 'pink', archAngle: 90 },
        ],
    },
];

// Diphthongs & Variant Vowels（双元音与变元音）
export const diphthongs: Phoneme[] = [
    {
        id: 'oi_oy',
        ipa: '/ɔɪ/',
        displayName: 'oi/oy',
        category: 'diphthongs',
        level: 3,
        backgroundColor: '#FFFDE7',
        graphemes: [
            { id: 'oi_coin', phonemeId: 'oi_oy', displayText: 'oi', position: 'medial', ruleText: 'oi 在词中发音。', chantText: 'Found a shiny coin!\noi - coin - /oi/', exampleWord: 'coin', archAngle: 135 },
            { id: 'oy_toy', phonemeId: 'oi_oy', displayText: 'oy', position: 'final', ruleText: 'oy 在词尾发音。', chantText: 'Play with a toy!\noy - toy - /oi/', exampleWord: 'toy', archAngle: 45 },
        ],
    },
    {
        id: 'ou_ow',
        ipa: '/aʊ/',
        displayName: 'ou/ow',
        category: 'diphthongs',
        level: 3,
        backgroundColor: '#FFFDE7',
        graphemes: [
            { id: 'ou_house', phonemeId: 'ou_ow', displayText: 'ou', position: 'medial', ruleText: 'ou 在词中发音。', chantText: 'In the big house!\nou - house - /ou/', exampleWord: 'house', archAngle: 135 },
            { id: 'ow_cow', phonemeId: 'ou_ow', displayText: 'ow', position: 'final', ruleText: 'ow 在词尾或部分词中（cow, down）。', chantText: 'See the brown cow!\now - cow - /ou/', exampleWord: 'cow', archAngle: 45 },
        ],
    },
    {
        id: 'au_aw',
        ipa: '/ɔː/',
        displayName: 'au/aw',
        category: 'diphthongs',
        level: 3,
        backgroundColor: '#FFFDE7',
        graphemes: [
            { id: 'au_sauce', phonemeId: 'au_aw', displayText: 'au', position: 'medial', ruleText: 'au 在词中发音。', chantText: 'Add some sauce!\nau - sauce - /au/', exampleWord: 'sauce', archAngle: 135 },
            { id: 'aw_paw', phonemeId: 'au_aw', displayText: 'aw', position: 'all', ruleText: 'aw 可在词尾或词中。', chantText: 'See the dog\'s paw!\naw - paw - /aw/', exampleWord: 'paw', archAngle: 45 },
        ],
    },
    {
        id: 'short_oo',
        ipa: '/ʊ/',
        displayName: 'oo (短音)',
        category: 'diphthongs',
        level: 3,
        backgroundColor: '#FFFDE7',
        graphemes: [
            { id: 'oo_book', phonemeId: 'short_oo', displayText: 'oo', position: 'medial', ruleText: 'oo 发短音 /u/。', chantText: 'Read a good book!\noo - book - /u/', exampleWord: 'book', archAngle: 90 },
        ],
    },
];

export const allPhonemes: Phoneme[] = [
    ...shortVowels,
    ...longVowels,
    ...consonants,
    ...digraphs,
    ...rControlledVowels,
    ...gluedSounds,
    ...diphthongs,
];

export const wordBank: Word[] = [
    // --- Level 1: Short Vowels & Simple Consonants ---
    { text: 'cat', segmentation: ['c', 'a', 't'], phonemeIds: ['k', 'short_a', 't'], difficulty: 1 },
    { text: 'dog', segmentation: ['d', 'o', 'g'], phonemeIds: ['d', 'short_o', 'g'], difficulty: 1 },
    { text: 'pig', segmentation: ['p', 'i', 'g'], phonemeIds: ['p', 'short_i', 'g'], difficulty: 1 },
    { text: 'bed', segmentation: ['b', 'e', 'd'], phonemeIds: ['b', 'short_e', 'd'], difficulty: 1 },
    { text: 'gum', segmentation: ['g', 'u', 'm'], phonemeIds: ['g', 'short_u', 'm'], difficulty: 1 },
    { text: 'bat', segmentation: ['b', 'a', 't'], phonemeIds: ['b', 'short_a', 't'], difficulty: 1 },
    { text: 'fan', segmentation: ['f', 'a', 'n'], phonemeIds: ['f', 'short_a', 'n'], difficulty: 1 },
    { text: 'hop', segmentation: ['h', 'o', 'p'], phonemeIds: ['h', 'short_o', 'p'], difficulty: 1 },
    { text: 'kid', segmentation: ['k', 'i', 'd'], phonemeIds: ['k', 'short_i', 'd'], difficulty: 1 },
    { text: 'run', segmentation: ['r', 'u', 'n'], phonemeIds: ['r', 'short_u', 'n'], difficulty: 1 },

    // --- Level 2: Digraphs & Glued Sounds ---
    { text: 'duck', segmentation: ['d', 'u', 'ck'], phonemeIds: ['d', 'short_u', 'k'], difficulty: 2 },
    { text: 'fish', segmentation: ['f', 'i', 'sh'], phonemeIds: ['f', 'short_i', 'sh'], difficulty: 2 },
    { text: 'chip', segmentation: ['ch', 'i', 'p'], phonemeIds: ['ch', 'short_i', 'p'], difficulty: 2 },
    { text: 'thin', segmentation: ['th', 'i', 'n'], phonemeIds: ['th_unvoiced', 'short_i', 'n'], difficulty: 2 },
    { text: 'ship', segmentation: ['sh', 'i', 'p'], phonemeIds: ['sh', 'short_i', 'p'], difficulty: 2 },
    { text: 'ball', segmentation: ['b', 'all'], phonemeIds: ['b', 'all'], difficulty: 2 },
    { text: 'ring', segmentation: ['r', 'ing'], phonemeIds: ['r', 'ing'], difficulty: 2 },
    { text: 'sing', segmentation: ['s', 'ing'], phonemeIds: ['s', 'ing'], difficulty: 2 },
    { text: 'pink', segmentation: ['p', 'ink'], phonemeIds: ['p', 'ink'], difficulty: 2 },
    { text: 'bank', segmentation: ['b', 'ank'], phonemeIds: ['b', 'ank'], difficulty: 2 },
    { text: 'hatch', segmentation: ['h', 'a', 'tch'], phonemeIds: ['h', 'short_a', 'ch'], difficulty: 2 },

    // --- Level 3: Long Vowels & Silent E ---
    { text: 'cake', segmentation: ['c', 'a', 'ke'], phonemeIds: ['k', 'long_a', 'long_a'], difficulty: 3 },
    { text: 'rain', segmentation: ['r', 'ai', 'n'], phonemeIds: ['r', 'long_a', 'n'], difficulty: 3 },
    { text: 'play', segmentation: ['p', 'l', 'ay'], phonemeIds: ['p', 'l', 'long_a'], difficulty: 3 },
    { text: 'feet', segmentation: ['f', 'ee', 't'], phonemeIds: ['f', 'long_e', 't'], difficulty: 3 },
    { text: 'leaf', segmentation: ['l', 'ea', 'f'], phonemeIds: ['l', 'long_e', 'f'], difficulty: 3 },
    { text: 'candy', segmentation: ['c', 'a', 'n', 'dy'], phonemeIds: ['k', 'short_a', 'n', 'y_vowel_e'], difficulty: 3 },
    { text: 'fly', segmentation: ['f', 'l', 'y'], phonemeIds: ['f', 'l', 'y_vowel_i'], difficulty: 3 },
    { text: 'kite', segmentation: ['k', 'i', 'te'], phonemeIds: ['k', 'long_i', 'long_i'], difficulty: 3 },
    { text: 'light', segmentation: ['l', 'igh', 't'], phonemeIds: ['l', 'long_i', 't'], difficulty: 3 },
    { text: 'home', segmentation: ['h', 'o', 'me'], phonemeIds: ['h', 'long_o', 'long_o'], difficulty: 3 },
    { text: 'boat', segmentation: ['b', 'oa', 't'], phonemeIds: ['b', 'long_o', 't'], difficulty: 3 },
    { text: 'snow', segmentation: ['sn', 'ow'], phonemeIds: ['s', 'n', 'long_o'], difficulty: 3 },
    { text: 'blue', segmentation: ['bl', 'ue'], phonemeIds: ['b', 'l', 'long_u_oo'], difficulty: 3 },
    { text: 'cute', segmentation: ['c', 'u', 'te'], phonemeIds: ['k', 'long_u_yoo', 'long_u_yoo'], difficulty: 3 },

    // --- Level 4: R-Controlled & Diphthongs ---
    { text: 'star', segmentation: ['st', 'ar'], phonemeIds: ['s', 'ar'], difficulty: 4 },
    { text: 'bird', segmentation: ['b', 'ir', 'd'], phonemeIds: ['b', 'er', 'd'], difficulty: 4 },
    { text: 'burn', segmentation: ['b', 'ur', 'n'], phonemeIds: ['b', 'er', 'n'], difficulty: 4 },
    { text: 'corn', segmentation: ['c', 'or', 'n'], phonemeIds: ['k', 'or', 'n'], difficulty: 4 },
    { text: 'book', segmentation: ['b', 'oo', 'k'], phonemeIds: ['b', 'short_oo', 'k'], difficulty: 4 },
    { text: 'house', segmentation: ['h', 'ou', 'se'], phonemeIds: ['h', 'ou_ow', 'z'], difficulty: 4 },
    { text: 'cow', segmentation: ['c', 'ow'], phonemeIds: ['k', 'ou_ow'], difficulty: 4 },
    { text: 'coin', segmentation: ['c', 'oi', 'n'], phonemeIds: ['k', 'oi_oy', 'n'], difficulty: 4 },
    { text: 'boy', segmentation: ['b', 'oy'], phonemeIds: ['b', 'oi_oy'], difficulty: 4 },

    // --- Level 5: Heart Words & Challenges ---
    { text: 'laugh', segmentation: ['l', 'au', 'gh'], phonemeIds: ['l', 'short_a', 'f'], difficulty: 5 },
    { text: 'bread', segmentation: ['br', 'ea', 'd'], phonemeIds: ['b', 'r', 'short_e', 'd'], difficulty: 5 },
    { text: 'said', segmentation: ['s', 'ai', 'd'], phonemeIds: ['s', 'short_e', 'd'], difficulty: 5 },
    { text: 'phone', segmentation: ['ph', 'o', 'ne'], phonemeIds: ['f', 'long_o', 'long_o'], difficulty: 5 },
    { text: 'knight', segmentation: ['kn', 'igh', 't'], phonemeIds: ['n', 'long_i', 't'], difficulty: 5 },
];

export function generatePracticeTask(word: Word): PracticeTask {
    return {
        id: Math.random().toString(36).substr(2, 9),
        word,
        availableCards: shuffleArray([...word.segmentation, 'b', 's', 'm']),
        correctAnswer: word.segmentation,
        category: 'short_vowels',
    };
}

function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
