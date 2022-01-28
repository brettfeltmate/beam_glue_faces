let DataLogger = {};

DataLogger.send = function(name, data, email){
    DataLogger.filedata = data;
    DataLogger.filename = name;
    DataLogger.email = email;

    $('body').append(
        $("<div />").attr('id', 'DataLogger-Modal').css({
            'min-height': '75%',
            width: '75%',
            'box-shadow': '5px 5px 5px rgba(0,0,0,.4)',
            'background-color': 'rgba(0,0,0,.2)',
            'z-index': 999999,
            position: 'absolute',
            top: '8%',
            left: '12.5%',
            display: 'none'
        }).append(
            $("<div />").attr('id', 'DataLogger-message').css({
                position: 'relative',
                width: 'inherit',
                height: 'inherit',
                padding: "50px",
                'margin-left': 'auto',
                'margin-right': 'auto',
                'line-height': '32pt',
                'font-size': '24pt',
                color: 'rbg(45,45,48)',
                'text-align': 'center'
            })
        )
    );


    $.ajax({
        type: "POST",
        url: 'write_data.php',
        data: {filename: DataLogger.filename, filedata: DataLogger.filedata},
        success: function(outcome) {
            if (outcome=='success') {
                DataLogger.success();
            } else {
                pr(outcome, 'ServerResp');
                DataLogger.fail();
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            DataLogger.fail();
        }
    });

    DataLogger.success = function() {
        let success_msg = 'Your data has been received,\n\nyou may now close this window.';
        $("#DataLogger-message").append(
            $("<div />").append([
                $("<pre />").css({
                    'width': 'inherit',
                    'white-space': 'pre-wrap',
                    'white-space': '-moz-pre-wrap',
                    'white-space': '-pre-wrap',
                    'white-space': '-o-pre-wrap',
                    'word-wrap': 'break-word',
                    'line-height': '12px'
                }).text(success_msg)
            ]));

        $("#DataLogger-Modal").css('display', 'block')
    };

    DataLogger.fail = function() {
        let fail_msg = `Something has gone wrong delivering your data to the server. Please copy everything below and send it to the following e-mail address:<br /> <a href='mailto: ${DataLogger.email}'>${DataLogger.email}</a>:`;
        $("#DataLogger-message").append(
            $("<div />").append([
                $("<p />").html(fail_msg),
                $("<pre />").css({
                    'width': 'inherit',
                    'font-size': '10px',
                    'white-space': 'pre-wrap',
                    'white-space': '-moz-pre-wrap',
                    'white-space': '-pre-wrap',
                    'white-space': '-o-pre-wrap',
                    'word-wrap': 'break-word',
                    'line-height': '12px'
                }).text(DataLogger.filedata)
            ]));

        $("#DataLogger-Modal").css('display', 'block')
    }
};