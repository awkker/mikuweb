// 音乐播放器配置
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: false,
    theme: '#39c5bb',
    loop: 'all',
    order: 'list',
    preload: 'auto',
    volume: 0.7,
    mutex: true,
    listFolded: false,
    listMaxHeight: 200,
    lrcType: 3,
    audio: [
        {
            name: 'ODDS&ENDS',
            artist: 'ryo (supercell) / 初音ミク',
            url: '../images/music/ryo (supercell),初音ミク - ODDS&ENDS_副本.mp3',
            cover: '../images/music/musicimage/ryo.jpg',
            lrc: '../images/music/lrc/ODDS&ENDS.lrc'
        },
        {
            name: 'からくりピエロ',
            artist: '40mP / 初音ミク',
            url: '../images/music/40mP,初音ミク - からくりピエロ_副本.mp3',
            cover: '../images/music/musicimage/40mp.jpg',
            lrc: '../images/music/lrc/からくりピエロ.lrc'
        }
    ]
});
