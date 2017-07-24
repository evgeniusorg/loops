(function () {
	var types = {
		'arc': {
			type: 'arc',
			top: 0,
			right: 1,
			bottom: 1,
			left: 0,
			rotate: 0
		},
		'line': {
			type: 'line',
			top: 0,
			right: 1,
			bottom: 0,
			left: 1,
			rotate: 0
		},
		'rhombus': {
			type: 'rhombus',
			top: 1,
			right: 1,
			bottom: 1,
			left: 1,
			rotate: 0
		},
		'angle': {
			type: 'angle',
			top: 0,
			right: 1,
			bottom: 1,
			left: 1,
			rotate: 0
		},
		'circle': {
			type: 'circle',
			top: 0,
			right: 0,
			bottom: 1,
			left: 0,
			rotate: 0
		},
		'empty': {
			type: 'empty',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			rotate: 0
		}
	}

	var rows = 18;
	var cols = 12;
	var level = 1;
	var elements;
	var start;

	if ( localStorage.getItem('loops_rows') && !isNaN(localStorage.getItem('loops_rows')) ) 
		rows = parseInt( localStorage.getItem('loops_rows') );

	if ( localStorage.getItem('loops_cols') && !isNaN(localStorage.getItem('loops_cols')) ) 
		cols = parseInt( localStorage.getItem('loops_cols'), 10 );

	if ( localStorage.getItem(`loops_level_${rows}_${cols}`) && !isNaN(localStorage.getItem(`loops_level_${rows}_${cols}`)) )
  		level = parseInt( localStorage.getItem(`loops_level_${rows}_${cols}`), 10 );

	$( "#rows" ).val(rows);
	$( "#cols" ).val(cols);

	$( "form" ).submit(function( event ) {
  		event.preventDefault();
  		var params = $( this ).serializeArray();

  		for(var item of params){
  			if (item.name == 'rows' && item.value != '' && !isNaN(item.value) && parseInt(item.value, 10) > 0 ) rows = parseInt(item.value, 10);
  			if (item.name == 'cols' && item.value != '' && !isNaN(item.value) && parseInt(item.value, 10) > 0 ) cols = parseInt(item.value, 10);
  		}


  		localStorage.setItem('loops_rows', rows);
  		localStorage.setItem('loops_cols', cols);
  		if ( localStorage.getItem(`loops_level_${rows}_${cols}`) && !isNaN(localStorage.getItem(`loops_level_${rows}_${cols}`)) )
  			level = parseInt( localStorage.getItem(`loops_level_${rows}_${cols}`), 10 );
  		else level = 1;

  		createGame();
	});

	function rotateObj(n, obj){
		for (var k = 0; k < n; k++) {
			var rotate = obj;
			var curretObj = {}

			curretObj.top = rotate.left;
			curretObj.right = rotate.top;
			curretObj.bottom = rotate.right;
			curretObj.left = rotate.bottom;
			curretObj.type = rotate.type;

			obj = curretObj;
		}
		return obj;
	}

	function createGame(){
		elements = [];
		document.getElementById('game').innerHTML = '';

		for(var i = 0; i < rows; i++) {
			elements.push([]);
			for (var j = 0; j < cols; j++) {
				elements[i].push({});
				if (i ==0){
					if (j == 0 ) {
						//1
						var currentTypes = ['arc', 'circle', 'empty'];
						var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
						elements[i][j] = types[type];

						if (type == 'circle') {
							var n = [0, 3][Math.floor(Math.random() * 2)];
							elements[i][j] = rotateObj(n, elements[i][j]);
						}
					}
					else if (j == cols - 1) {
						//3
						if (elements[i][j-1].right == 1){
							// 0, 1
							var currentTypes = ['arc', 'circle'];
							var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
							elements[i][j] = types[type];

							if (type == 'arc') {
								var n = 1;
								elements[i][j] = rotateObj(n, elements[i][j])
							}

							if (type == 'circle') {
								var n = 1;
								elements[i][j] = rotateObj(n, elements[i][j])
							}
						}
						else{
							// 0, 0
							var currentTypes = ['empty', 'circle'];
							var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
							elements[i][j] = types[type];
						}
					}
					else {
						//2
						if (elements[i][j-1].right == 1){
							// 0, 1
							var currentTypes = ['arc', 'circle', 'line', 'angle'];
							var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
							elements[i][j] = types[type];

							if (type == 'arc') {
								var n = 1;
								elements[i][j] = rotateObj(n, elements[i][j])
							}

							if (type == 'circle') {
								var n = 1;
								elements[i][j] = rotateObj(n, elements[i][j])
							}
						}
						else{
							// 0, 0
							var currentTypes = ['arc', 'circle', 'empty'];
							var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
							elements[i][j] = types[type];

							if (type == 'circle') {
								var n = [0, 3][Math.floor(Math.random() * 2)];
								elements[i][j] = rotateObj(n, elements[i][j])
							}
						}
					}
				}
				else if (i == rows - 1 ) {
					if (j == 0 ) {
						//7
						if (elements[i-1][j].bottom == 1){
							//1, 0
							var currentTypes = ['arc', 'circle'];
							var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
							elements[i][j] = types[type];

							if (type == 'circle') {
								var n = 2;
								elements[i][j] = rotateObj(n, elements[i][j])
							}

							if (type == 'arc') {
								var n = 3;
								elements[i][j] = rotateObj(n, elements[i][j])
							}
						}
						else {
							//0, 0
							var currentTypes = ['empty', 'circle'];
							var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
							elements[i][j] = types[type];

							if (type == 'circle') {
								var n = 3;
								elements[i][j] = rotateObj(n, elements[i][j])
							}
						}
					}
					else if (j == cols - 1) {
						//9
						if (elements[i-1][j].bottom == 1){
							if (elements[i][j-1].right == 1){
								//1, 1
								var currentTypes = ['arc'];
								var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
								elements[i][j] = types[type];

								if (type == 'arc') {
									var n = 2;
									elements[i][j] = rotateObj(n, elements[i][j])
								}
							}
							else{
								// 1, 0
								var currentTypes = ['circle'];
								var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
								elements[i][j] = types[type];

								if (type == 'circle') {
									var n = 2;
									elements[i][j] = rotateObj(n, elements[i][j])
								}
							}
						}
						else {
							if (elements[i][j-1].right == 1){
								// 0, 1
								var currentTypes = ['circle'];
								var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
								elements[i][j] = types[type];

								if (type == 'circle') {
									var n = 1;
									elements[i][j] = rotateObj(n, elements[i][j])
								}
							}
							else{
								// 0, 0
								var currentTypes = ['empty'];
								var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
								elements[i][j] = types[type];
							}

						}
					}
					else {
						//8
						if (elements[i-1][j].bottom == 1){
							if (elements[i][j-1].right == 1){
								//1, 1
								var currentTypes = ['arc', 'angle'];
								var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
								elements[i][j] = types[type];

								if (type == 'arc') {
									var n = 2;
									elements[i][j] = rotateObj(n, elements[i][j])
								}

								if (type == 'angle') {
									var n = 2;
									elements[i][j] = rotateObj(n, elements[i][j])
								}
							}
							else{
								// 1, 0
								var currentTypes = ['arc', 'circle'];
								var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
								elements[i][j] = types[type];

								if (type == 'arc') {
									var n = 3;
									elements[i][j] = rotateObj(n, elements[i][j])
								}

								if (type == 'circle') {
									var n = 2;
									elements[i][j] = rotateObj(n, elements[i][j])
								}
							}
						}
						else {
							if (elements[i][j-1].right == 1){
								// 0, 1
								var currentTypes = ['circle', 'line'];
								var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
								elements[i][j] = types[type];

								if (type == 'circle') {
									var n = 1;
									elements[i][j] = rotateObj(n, elements[i][j])
								}
							}
							else{
								// 0, 0
								var currentTypes = ['empty', 'circle'];
								var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
								elements[i][j] = types[type];

								if (type == 'circle') {
									var n = 3;
									elements[i][j] = rotateObj(n, elements[i][j])
								}
							}

						}
					}
				}
				else {
					if (j == 0 ) {
						//4
						if (elements[i-1][j].bottom == 1){
							//1, 0
							var currentTypes = ['arc', 'circle', 'line', 'angle'];
							var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
							elements[i][j] = types[type];

							if (type == 'circle') {
								var n = 2;
								elements[i][j] = rotateObj(n, elements[i][j])
							}

							if (type == 'arc') {
								var n = 3;
								elements[i][j] = rotateObj(n, elements[i][j])
							}

							if (type == 'line') {
								var n = 1;
								elements[i][j] = rotateObj(n, elements[i][j])
							}

							if (type == 'angle') {
								var n = 3;
								elements[i][j] = rotateObj(n, elements[i][j])
							}
						}
						else {
							//0, 0
							var currentTypes = ['arc', 'circle', 'empty'];
							var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
							elements[i][j] = types[type];

							if (type == 'circle') {
								var n = [0, 3][Math.floor(Math.random() * 2)];
								elements[i][j] = rotateObj(n, elements[i][j])
							}
						}
					}
					else if (j == cols - 1) {
						//6
						if (elements[i-1][j].bottom == 1){
							if (elements[i][j-1].right == 1){
								//1, 1
								var currentTypes = ['arc', 'angle'];
								var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
								elements[i][j] = types[type];

								if (type == 'arc') {
									var n = 2;
									elements[i][j] = rotateObj(n, elements[i][j])
								}

								if (type == 'angle') {
									var n = 1;
									elements[i][j] = rotateObj(n, elements[i][j])
								}
							}
							else{
								// 1, 0
								var currentTypes = ['line', 'circle'];
								var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
								elements[i][j] = types[type];

								if (type == 'circle') {
									var n = 2;
									elements[i][j] = rotateObj(n, elements[i][j])
								}

								if (type == 'line') {
									var n = 1;
									elements[i][j] = rotateObj(n, elements[i][j])
								}
							}
						}
						else {
							if (elements[i][j-1].right == 1){
								// 0, 1
								var currentTypes = ['arc', 'circle'];
								var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
								elements[i][j] = types[type];

								if (type == 'circle') {
									var n = 1;
									elements[i][j] = rotateObj(n, elements[i][j])
								}

								if (type == 'arc') {
									var n = 1;
									elements[i][j] = rotateObj(n, elements[i][j])
								}
							}
							else{
								// 0, 0
								var currentTypes = ['empty', 'circle'];
								var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
								elements[i][j] = types[type];
							}

						}
					}
					else {
						//5
						if (elements[i-1][j].bottom == 1){
							if (elements[i][j-1].right == 1){
								//1, 1
								var currentTypes = ['arc', 'rhombus', 'angle'];
								var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
								elements[i][j] = types[type];

								if (type == 'arc') {
									var n = 2;
									elements[i][j] = rotateObj(n, elements[i][j])
								}

								if (type == 'angle') {
									var n = [1, 2][Math.floor(Math.random() * 2)];
									elements[i][j] = rotateObj(n, elements[i][j])
								}
							}
							else{
								// 1, 0
								var currentTypes = ['arc', 'circle', 'line', 'angle'];
								var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
								elements[i][j] = types[type];

								if (type == 'circle') {
									var n = 2;
									elements[i][j] = rotateObj(n, elements[i][j])
								}

								if (type == 'arc') {
									var n = 3;
									elements[i][j] = rotateObj(n, elements[i][j])
								}

								if (type == 'angle') {
									var n = 3;
									elements[i][j] = rotateObj(n, elements[i][j])
								}

								if (type == 'line') {
									var n = 1;
									elements[i][j] = rotateObj(n, elements[i][j])
								}
							}
						}
						else {
							if (elements[i][j-1].right == 1){
								// 0, 1
								var currentTypes = ['arc', 'circle', 'line', 'angle'];
								var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
								elements[i][j] = types[type];

								if (type == 'circle') {
									var n = 1;
									elements[i][j] = rotateObj(n, elements[i][j])

								}

								if (type == 'arc') {
									var n = 1;
									elements[i][j] = rotateObj(n, elements[i][j])
								}
							}
							else{
								// 0, 0
								var currentTypes = ['arc', 'circle', 'empty'];
								var type = currentTypes[Math.floor(Math.random() * currentTypes.length)];
								elements[i][j] = types[type];

								if (type == 'circle') {
									var n = [0, 3][Math.floor(Math.random() * 2)];
									elements[i][j] = rotateObj(n, elements[i][j])
								}
							}

						}
					}
				}
			}
		}

		for(var i = 0; i < rows; i++) {
			var newLine = document.createElement('Div');
			newLine.className = "row";

			for (var j = 0; j < cols; j++) {
				var n = Math.floor(Math.random() * 4);
				var newObj = types[elements[i][j].type];
				for (var k = 0; k < n; k++) {
					var rotate = newObj;
					var curretObj = {}

					curretObj.top = rotate.left;
					curretObj.right = rotate.top;
					curretObj.bottom = rotate.right;
					curretObj.left = rotate.bottom;
					curretObj.type = rotate.type;

					newObj = curretObj;
				}
				elements[i][j] = newObj;

				var newCell = document.createElement("div");
				newCell.setAttribute('id', i + '-' + j);
				newCell.setAttribute('r', n * 90);
				newCell.setAttribute('style', 'transform:rotate(' + n * 90 + 'deg)');

	        	newCell.className = "cell " + elements[i][j].type;
	        	newLine.appendChild(newCell);

			}

			document.getElementById('game').appendChild(newLine);
		}

		$('#level').html(level);

		start = false;
		checkLoops ();

		$('.cell').on('click', function(event){
			var match = $(event.target).attr('id').split('-');
			turnElement(match[0], match[1]);
			var r = parseInt($(event.target).attr('r'));
			r += 90;

			$(event.target).attr({'style': 'transform:rotate(' + r + 'deg)', 'r': r});
		});
	}

	createGame();

	function turnElement(i, j) {
		var rotate =elements[i][j];
		var newElement = {};
		newElement.top = rotate.left;
		newElement.right = rotate.top;
		newElement.bottom = rotate.right;
		newElement.left = rotate.bottom;
		newElement.type = rotate.type;

		elements[i][j] = newElement;
		checkLoops ();
	};

	function checkLoops() {
		var status = true;
		for(var i = 0; i < rows; i++) {
			for (var j = 0; j < cols; j++) {
				if (i == 0){
					if(j != 0) {
						if (elements[i][j - 1].right != elements[i][j].left){
							status = false;
							break;
						}
					}
				}
				else {
					if (j == 0) {
						if (elements[i - 1][j].bottom != elements[i][j].top){
							status = false;
							break;
						}

					}
					else {
						if (elements[i][j - 1].right != elements[i][j].left || elements[i - 1][j].bottom != elements[i][j].top){
							status = false;
							break;
						}
					}
				}

				if (i == 0){
					if (elements[i][j].top == 1) {
						status = false;
						break;
					}
				}

				if(j==0){
					if(elements[i][j].left == 1) {
						status = false;
						break;
					}
				}

				if (i == rows -1 ) {
					if (elements[i][j].bottom == 1) {
						status = false;
						break;
					}
				}

				if(j == cols -1){ 
					if (elements[i][j].right == 1) {
						status = false;
						break;
					}
				}
			}

			if (status == false) {
				break;
			}
		}

		if (start && status) {
			start = true;
			win();
		}
		else if (status && !start){
			createGame();
		}
		else
			start = true;
	}

	function win (){
		setTimeout(function(){
			level += 1;

			$('#modal').html(level);
			$('.modal').addClass('active');

			localStorage.setItem(`loops_level_${rows}_${cols}`, level);
		}, 300);

		setTimeout(function(){
			$('.modal').removeClass('active');
			createGame();
		}, 1300);
	}
})()