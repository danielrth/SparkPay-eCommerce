//$('#nav ul').css('display', 'none');
		$('#nav ul').addClass('first_level');
		$('#nav ul li ul').addClass('second_level');
		$('#nav ul li ul li ul').addClass('third_level');
		$('#nav ul li ul').removeClass('first_level');
		$('#nav ul li ul li ul').removeClass('first_level');
		$('#nav ul li ul li ul').removeClass('second_level');
		$('a.menubtn').click(function(){
			$('ul.first_level').toggle();
		});
		
		if (window.innerWidth < 601) {
			$('ul.first_level li:has(ul)').on('click',function(){
				$(this).find('ul.second_level').slideToggle();
				return false;
			});
			
			$('ul.second_level li:has(ul)').on('click',function(){
				$(this).find('ul.third_level').slideToggle();
				return false;
			});
		
		}