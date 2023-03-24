const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const btnNext = $('.btn-next')
const btnPrew = $('.btn-prev')
const randombtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: "Má la anh giờ",
            singer: "Hana Cẩm Tiên",
            path: "./asset/music/ma_la_anh_gio.mp3",
            image: "./asset/img/zing_mp3.png" 
        },
        {
            name: "Đời vô tư người vô tâm",
            singer: "Phát Huy",
            path: "./asset/music/doi_vo_tu_nguoi_vo_tam.mp3",
            image: "./asset/img/zing_mp3.png"
        },
        {
            name: "Tháng 4 là lời nói dối của em",
            singer: "Hà Anh Tuấn",
            path: "./asset/music/song3.mp3",
            image: "./asset/img/zing_mp3.png"
        },
        {
            name: "Là do em xui thôi",
            singer: "Khói, Sofia, Châu Đăng Khoa",
            path: "./asset/music/la_do_em_xui_thoi.mp3",
            image: "./asset/img/zing_mp3.png" 
        },
        {
            name: "Yêu một người vô tâm",
            singer: "Bảo Anh",
            path: "./asset/music/yeu_mot_nguoi_vo_tam.mp3",
            image: "./asset/img/zing_mp3.png"
        },
        {
            name: "Khóc một mình",
            singer: "Karik, Windy Quyên",
            path: "./asset/music/khoc_mot_minh.mp3",
            image: "./asset/img/zing_mp3.png"
        },
        {
            name: "Em hát ai nghe",
            singer: "Orange",
            path: "./asset/music/em_hat_ai_nghe.mp3",
            image: "./asset/img/zing_mp3.png" 
        },
        {
            name: "Lâu lâu nhắc lại",
            singer: "Hà Nhi, Khói",
            path: "./asset/music/lau_lau_nhac_lai.mp3",
            image: "./asset/img/zing_mp3.png"
        },
        {
            name: "Từng là tụi mình",
            singer: "Khói, Magazine, Sofia",
            path: "./asset/music/tung_la_tui_minh.mp3",
            image: "./asset/img/zing_mp3.png"
        },
        {
            name: "Gió",
            singer: "Yank",
            path: "./asset/music/gio.mp3",
            image: "./asset/img/zing_mp3.png"
        },
        {
            name: "Yêu như trẻ con",
            singer: "Bray",
            path: "./asset/music/YeuNhuTreCon.mp3",
            image: "./asset/img/zing_mp3.png"
        },
        {
            name: "Đông phai mờ dáng ai",
            singer: "DatKaa",
            path: "./asset/music/DongPhaiMoDangAi.mp3",
            image: "./asset/img/zing_mp3.png"
        },
        {
            name: "Cơn mưa chiều ấy",
            singer: "DatKaa",
            path: "./asset/music/ConMuaChieuAy.mp3",
            image: "./asset/img/zing_mp3.png"
        },
    ],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${ index === this.currentIndex ? 'active' : ''}" data-index = "${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title"> ${song.name} </h3>
                    <p class="author"> ${song.singer} </p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
          </div>
            `
        })
        $('.playlist').innerHTML = htmls.join("")
    },
    handleEvent: function () {
        const cd = $('.cd')
        const cdWidth = cd.offsetWidth
        const _this = this
        // xử lý phóng to / thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop

            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0
            cd.style.opacity = newCdWidth / cdWidth
        }
        // CD quay / dừng
        const cdThumbAnimate = cdThumb.animate( [
            {
                transform: 'rotate(360deg)'
            }
        ], {duration: 10000,
            iterations: Infinity   
        })
        cdThumbAnimate.pause()
        // xử lý nút phát nhạc
        playBtn.onclick = function () {
            if(_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
            
        }
        // khi song được chạy
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        // khi song bị dùng
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        // tiến độ bài hát
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const currentPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = currentPercent
            }
        }
        // tua bài hát
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
    
        }
        // next song
        btnNext.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
        }        
        // prew song
        btnPrew.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prewtSong()
            }
            audio.play()
            _this.render()
        }    
        // trình phát ngẫu nhiên song
        randombtn.onclick = function (e) {
            _this.isRandom =! _this.isRandom
            randombtn.classList.toggle('active', _this.isRandom)

        }
        // next new song khi end song
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else {
                btnNext.click()
            }
        } 
        repeatBtn.onclick = function () {
            _this.isRepeat =! _this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')) {
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
                if (e.target.closest('.option')) {

                }
            }
        }
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `Url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prewtSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length -1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function () {
        let newIndex 
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function () {
        this.render()
        this.handleEvent()    
        this.defineProperties()    
        this.loadCurrentSong()
    }
}

app.start()