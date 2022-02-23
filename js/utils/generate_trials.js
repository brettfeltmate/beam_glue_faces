var block_num = 0

generate_trials = function (table, test_part, search_condition) {
    let to_return = [];

    let target_set;
    let distractor_set;

    if (search_condition === 'conjunction') {
        target_set = conjunction_target;
        distractor_set = conjunction_distractors;
    } else { // feature search
        target_set = feature_targets;
        distractor_set = feature_distractors;
    }


    let repetitions = test_part === 'practice' ? 1 : 1;

    block_num += 1;


    for (let rep = 0; rep < repetitions; rep++) {
        for (let i = 0; i < table.length; i++) {
            let cue;
            let target;
            let distractor_1;
            let distractor_2;
            let stimuli;
            let response;
            let t_char;
            let t_rgb;
            let t_color;
            let d1_char;
            let d1_rgb;
            let d1_color
            let d2_char;
            let d2_rgb;
            let d2_color;


            let final_display = '<div class=display>';

            let array_display = table[i][0] == 'LEFT' ? '<table class="array left">' : '<table class="array right">';


            if (table[i][2] == 'TRUE') {
                target = target_set[target_set.length * Math.random() | 0];
                distractor_1 = distractor_set[distractor_set.length * Math.random() | 0];

                t_char = target[0];
                t_rgb = target[1];
                t_color = target[2];
                d1_char = distractor_1[0];
                d1_rgb = distractor_1[1];
                d1_color = distractor_1[2];
                d2_char = 'NA';
                d2_rgb = 'NA';
                d2_color = 'NA';

                stimuli = [target, distractor_1];
                stimuli = array_shuffle(stimuli);

                response = present_key;
            } else {
                let x = distractor_set.length * Math.random() | 0;
                let y = distractor_set.length * Math.random() | 0;

                while (x == y) {
                    y = distractor_set.length * Math.random() | 0;
                }

                distractor_1 = distractor_set[x];
                distractor_2 = distractor_set[y];

                t_char = 'NA';
                t_rgb = 'NA';
                t_color = 'NA';
                d1_char = distractor_1[0];
                d1_rgb = distractor_1[1];
                d1_color = distractor_1[2];
                d2_char = distractor_2[0];
                d2_rgb = distractor_2[1];
                d2_color = distractor_2[2];

                stimuli = [distractor_1, distractor_2];
                stimuli = array_shuffle(stimuli);

                response = absent_key;
            }


            array_display +=
                `<tr>` +
                `<td class="cell">` +
                `<p class="char-stim" style="color: ${stimuli[0][1]}">${stimuli[0][0]}</p>` +
                `</td>` +
                `<td class="cell">` +
                `<p class="char-stim" style="color: ${stimuli[1][1]}">${stimuli[1][0]}</p>` +
                `</td>` +
                `</tr>` +
                `</table>`

            // this has to go at the end I think
            cue = (table[i][1] === 'LEFT') ? cue_L : cue_R

            if (table[i][0] == 'LEFT') {
                final_display += array_display;
                final_display += cue;
                final_display += `<table class = 'array right'></table>`
            }
            else {
                final_display += `<table class = 'array left'></table>`
                final_display += cue;
                final_display += array_display;
            }


            final_display += `</div>`;

            to_return.push(
                {
                    fix: fix,
                    cue: cue,
                    target: final_display,
                    data: {
                        trial_num: i + (rep * 10),
                        practicing: test_part == 'practice',
                        block_num: block_num,
                        condition: 2,
                        block_type: search_condition,
                        target_present: table[i][2],
                        cue_valid: table[i][1] == table[i][0],
                        visual_field: table[i][0],
                        cue_direction: table[i][1],
                        correct_response: response,
                        target_id: t_char,
                        target_rgb: t_rgb,
                        target_color: t_color,
                        distractor1_id: d1_char,
                        distractor1_rgb: d1_rgb,
                        distractor1_color: d1_color,
                        distractor2_id: d2_char,
                        distractor2_rgb: d2_rgb,
                        distractor2_color: d2_color,
                        distractor3_id: 'NA',
                        distractor3_rgb: 'NA',
                        distractor3_color: 'NA',
                        distractor4_id: 'NA',
                        distractor4_rgb: 'NA',
                        distractor4_color: 'NA'
                    }
                });
        }

    }

    // Trim trial list to 25 for practice
    if (test_part == 'practice') {
        arr1 = to_return.slice(0,21);
        arr2 = to_return.slice(21, to_return.length);
        to_return = arr1;
        to_return.concat(jsPsych.randomization.sampleWithoutReplacement(arr2, 5));
    };
    return array_shuffle(to_return);
}