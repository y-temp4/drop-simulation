// forked from Shingo.Suzuki's "物理シミュレーション　落下" http://jsdo.it/Shingo.Suzuki/k11D
$(function(){

    //Ballのインスタンスを格納
    var ball;

    var interval;

    //重量加速度
    var g = 0.08;

    //速度
    var vx = 0;
    var vy = 0;

    //衝突係数
    var k = 0.8;

    //画面の上端
    var topY;

    //画面の下端
    var bottomY;

    //画面の右端
    var rightX;

    //画面の左端
    var leftX;

    var init = function(){

        //画面の端を設定
        topY = 0 + $(".ball").height()*.5;

        bottomY = $(".wrap").height() - $(".ball").height()*.5;
        // bottomY = $(window).height()*.5 - $(".ball").height()*.5;
        rightX = $(".wrap").width() - $(".ball").width()*.5;
        // rightX = $(window).width()*.5 - $(".ball").width()*.5;
        leftX = $(".ball").width()*.5;

        //Ballインスタンスを作成
        ball = Ball($(".ball"));

        //初期座標を設定
        ball.x = 50;
        ball.y = 20;
        // ball.y = 10;
        vx = 10;

        //座標を画面表示に反映
        ball.updatePosition();

        //画面に表示
        ball.show();

        //アニメーション開始
        startAnime();

    };


    var startAnime = function(){
        interval = setInterval(onTimer,15);
    };


    var stopAnime = function(){
        clearInterval(interval);
    };


    var onTimer = function(){

        //速度に加速度を加算
        vy += g;

        //X座標に速度を加算
        ball.x += vx;
        ball.y += vy;

        if(ball.y > bottomY){
            //下端にボールが衝突した場合
            ball.y = bottomY - (ball.y - bottomY)*k;
            vx = vx * k;
            vy = -vy * k;
        }else if(ball.y < topY){
            ball.y = topY - (ball.y - topY)*k;
            vx = vx * k;
            vy = -vy * k;
        }

        if(ball.x > rightX){
            //右端にボールが衝突した場合
            ball.x = rightX - (ball.x - rightX)*k;
            vx = -vx * k;
            vy = vy * k;

        }else if(ball.x < leftX){
            //左端にボールが衝突した場合
            ball.x = leftX - (ball.x - leftX)*k;
            vx = -vx * k;
            vy = vy * k;
        }


        //座標を画面表示に反映
        ball.updatePosition();

    };


    var Ball = function($elm){
        var instance = {x: 0, y: 0};
        instance.updatePosition = function(){
            var translate = "translate3d(" + instance.x + "px, " + instance.y + "px, 0)";
            $elm.css({
                "transform": translate,
                "-webkit-transform": translate,
                "-ms-transform": translate,
                "-o-transform": translate
            });
        };
        instance.show = function(){
            $elm.show();
        };
        return instance;
    };

    var isStartedDemo = false;

    var startDemo = function() {
        if ( isStartedDemo === false ) {
            isStartedDemo = true;
            $(".control").css(
                'background', '#D32F2F'
                );
            $("#start_demo").text('再スタート');
        }
        vx = 10;
        vy = 0;

        if ( $(".control").text() === 'とめる' ) {
            stopAnime();
            init();
        }
        setInterval( objectPosition, 15);
    };

    $("#start_demo").on('click', startDemo);

    $(".control").on('click', function() {
        if ( isStartedDemo === true ) {
            if ( $(".control").text() === 'うごかす' ) {
                startAnime();
                $(".control").css(
                    'background', '#D32F2F'
                    );
                $("#start_demo").css(
                    'background', '#3F51B5'
                    );
                $(".control").text('とめる');
            }
            else if ( $(".control").text() === 'とめる' ) {
                $(".control").text('うごかす');
                $(".control").css(
                    'background', '#3F51B5'
                    );
                $("#start_demo").css(
                    'background', '#727272'
                    );
                stopAnime();
            }
        }
    });

    // 物体のX軸、Y軸での位置を特定
    var objectPosition = function() {
        $("#form1").text(Math.floor( ball.x - 20 ));
        $("#form2").text(Math.floor( 500 - ball.y - 20 ));
    };

    // 各種値の初期値を設定し、インプットフォームに入れる
    var setDefaultValue = function(id, value) {
        $( '#' + id ).val(value);
    };

    // 衝突径数を設定
    setDefaultValue("rebound_coefficient", k);
    $('#rebound_coefficient').change( function() {
        k = $('#rebound_coefficient').val();
    } );


    // ここから未実装

    // 初期速度を設定
    // setDefaultValue("initial_velocity", vx);
    // $('#initial_velocity').change( function() {
    //     vx = $('#initial_velocity').val();
    // } );

    // 重力加速度を設定
    // setDefaultValue("gravity_acceleration", g);
    // $('#gravity_acceleration').change( function() {
    //     g = $('#gravity_acceleration').val();
    // } );
});
