// モーダルのモデルを定義
const ModalModel = Backbone.Model.extend({
    defaults: {
        name1: '',
        email1: '',
        phone1: '',
        name2: '',
        email2: '',
        phone2: '',
        isDisabled: false,
        title: 'フォームサンプル'
    }
});

// モーダルのビューを定義
const ModalView = Backbone.View.extend({
    el: '#modal', // モーダルのDOM要素をターゲット

    initialize: function() {
        this.render();
    },

    render: function() {
        return this;
    },

    openModal: function(data, title) {
        const modalModel = new ModalModel({
            name1: data.name1,
            email1: data.email1,
            isDisabled: data.isDisabled,
            title: title || 'フォームサンプル'
        });

        // モーダル内のフォーム項目を設定
        this.$('#modal-title').text(modalModel.get('title'));
        this.$('#name1-modal').val(modalModel.get('name1')).prop('disabled', modalModel.get('isDisabled'));
        this.$('#email1-modal').val(modalModel.get('email1')).prop('disabled', modalModel.get('isDisabled'));
        this.$('#submitButton').prop('disabled', modalModel.get('isDisabled'));

        // サイズ指定があれば反映
        if (data.width) {
            $('#modal').css('width', data.width);
        }
        if (data.height) {
            $('#modal').css('height', data.height);
        }

        // モーダルとオーバーレイを表示
        $('#modal').show();
        $('#overlay').show();
    },

    events: {
        'click #showQrBtn': 'generateQRCode',
        'click #qrClose': 'closeQRCodePanel',
        'click #submitButton': 'handleSubmit',
        'click #closeModalButton': 'closeModal' // 閉じるボタンのイベント
    },

    // QRコード生成処理
    generateQRCode: function() {
        const qrData = {
            name1: this.$('#name1-modal').val(),
            email1: this.$('#email1-modal').val()
        };

        const qr = new QRious({
            element: document.getElementById('qrCode'),
            value: JSON.stringify(qrData),
            size: 200
        });

        // QRパネルを表示
        this.$('#qrPanel').show();
        this.$('#showQrBtn').prop('disabled', true);
    },

    // QRパネルを閉じる
    closeQRCodePanel: function() {
        this.$('#qrPanel').hide();
        this.$('#showQrBtn').prop('disabled', false);
    },

    // フォーム送信処理
    handleSubmit: function(event) {
        event.preventDefault();
        alert('フォームが送信されました。');
        this.closeModal();
    },

    closeModal: function() {
        $('#modal').hide();
        $('#overlay').hide();
    },
    // 閏年判定関数を追加してください
    isLeapYear: function(year) {
        // 西暦yearが閏年ならtrueを返す
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
    
});
