$( document ).ready( function( e ){
	// form #createUser validate rules
	$( "#searchFlightForm" ).validate( {
		errorPlacement : function( label, element ){
			// label.addClass('arrow');
			element.parent( '.date' ).addClass( 'datepicker-error' );
			/*
			 * if (element.attr("class") == "form-control error") { element.parent('.date').addClass('datepicker-error'); }
			 */

		}, wrapper : 'span',

		rules : {
			journeyStart : {
				required : true
			}, journeyEnd : {
				required : true
			}
		}, messages : {
			journeyStart : {
				required : "Please select the destination you wish to fly from'",
			}
		}

	} );

	$( '.loginFormEnter' ).keyup( function( e ){
		if ( e.keyCode == 13 ) {
			loginFunctn();
		}
	} );

	$( '#forgotPasswordUserId' ).keyup( function( e ){
		if ( e.keyCode == 13 ) {
			forgotPasswordFunctn();
		}
	} );

} );
var journeyStartCode = "";
var journeyEndCode = "";
var journeyStartCodeModify = "";
var journeyEndCodeModify = "";
function validateForm(){
	// debugger;
	journeyStartCode = "";
	journeyEndCode = "";
	var flightType = $( ".tripType" );
	var returnDate = $( "#dtpStartDate2" ).val();
	var departureDate = $( "#dtpStartDate" ).val();

	var journeyStart = $( "#journeyStart" ).val();
	var journeyStartTrimVal = $.trim( journeyStart );
	$( "#journeyStart" ).val( journeyStartTrimVal );

	var journeyEnd = $( "#journeyEnd" ).val();
	var journeyEndTrimVal = $.trim( journeyEnd );
	$( "#journeyEnd" ).val( journeyEndTrimVal );

	var adult = $( "#adult" ).val();
	var child = $( "#child" ).val();
	// alert(adult.length+"---"+adult);
	var sumAdultChild = parseInt( adult ) + parseInt( child );
	// alert(sumAdultChild);
	var flightTypeVal;

	if ( isNotValidObject( journeyStart ) ) {
		$( "#journeyStart" ).addClass( 'error' );
	}
	if ( isNotValidObject( journeyEnd ) ) {
		$( "#journeyEnd" ).addClass( 'error' );
	}
	if ( isNotValidObject( journeyStart ) || isNotValidObject( journeyEnd ) ) {
		return false;
	}
	if ( flightType[ 0 ].checked ) {
		flightTypeVal = flightType[ 0 ].value;
	}
	else if ( flightType[ 1 ].checked ) {
		flightTypeVal = flightType[ 1 ].value;
	}
	else {
		flightTypeVal = flightType[ 2 ].value;
	}
	if ( flightTypeVal == 'O' ) {
		if ( isNotValidObject( departureDate ) ) {
			$( "#dtpStartDate" ).parent( '.date' ).addClass( 'datepicker-error' );
		}
		else {
			$( "#dtpStartDate" ).parent( '.date' ).removeClass( 'datepicker-error' );
		}
		if ( isNotValidObject( departureDate ) ) {
			return false;
		}

		if ( sumAdultChild > 10 ) {
			alert( "Total passenger's should not exceed limit of 10." );
			return false;
		}
		if ( adult == 0 && child == 0 ) {
			alert( "Please select at least one passenger." );
			return false;
		}

	}
	if ( flightTypeVal == 'R' ) {
		if ( isNotValidObject( departureDate ) ) {
			$( "#dtpStartDate" ).parent( '.date' ).addClass( 'datepicker-error' );
		}
		else {
			$( "#dtpStartDate" ).parent( '.date' ).removeClass( 'datepicker-error' );
		}
		if ( isNotValidObject( returnDate ) ) {
			$( "#dtpStartDate2" ).parent( '.date' ).addClass( 'datepicker-error' );
			return false;
		}
		else {
			$( "#dtpStartDate2" ).parent( '.date' ).removeClass( 'datepicker-error' );
		}
		if ( isNotValidObject( departureDate ) || isNotValidObject( returnDate ) ) {
			return false;
		}

		if ( sumAdultChild > 10 ) {
			alert( "Total passenger's should not exceed limit of 10." );
			return false;
		}
		if ( adult == 0 && child == 0 ) {
			alert( "Please select at least one passenger." );
			return false;
		}
	}
	// debugger;
	if ( flightTypeVal == 'M' ) {

		if ( isNotValidObject( departureDate ) ) {
			$( "#dtpStartDate" ).parent( '.date' ).addClass( 'datepicker-error' );
		}
		else {
			$( "#dtpStartDate" ).parent( '.date' ).removeClass( 'datepicker-error' );
		}
		if ( isNotValidObject( departureDate ) ) {
			return false;
		}

		if ( sumAdultChild > 10 ) {
			alert( "Total passenger's should not exceed limit of 10." );
			return false;
		}
		if ( adult == 0 && child == 0 ) {
			alert( "Please select at least one passenger." );
			return false;
		}
		journeyStartCode = "KTM";
		journeyEndCode = "MTN";

	}
	if ( flightTypeVal != 'M' ) {
		if ( journeyStart === journeyEnd ) {
			alert( "Source and Destination place cannot be same." );
			return false;
		}

		if ( sectorToList != null && sectorToList.length > 0 ) {
			$.each( sectorToList, function( i, sectorToList ){
				if ( journeyStart.toUpperCase() == sectorToList.SectorName.toUpperCase() ) {
					journeyStartCode = sectorToList.SectorCode;
					return false;
				}
			} );
			$.each( sectorToList, function( i, sectorToList ){
				if ( journeyEnd.toUpperCase() == sectorToList.SectorName.toUpperCase() ) {
					journeyEndCode = sectorToList.SectorCode;
					return false;
				}
			} );
		}
	}
	if ( journeyStartCode == "" ) {
		alert( "Please select the destination you wish to fly from" );
		$( "#journeyStart" ).val( "" );
		return false;
	}
	if ( journeyEndCode == "" ) {
		alert( "Please select the destination you wish to fly to" );
		$( "#journeyEnd" ).val( "" );
		return false;
	}
	// ///////
	window.parent.$( '.loadingPopup' ).removeClass( 'hide' );

	window.top.location.href = "/booking/searchflight?nationality=" + $( "#nationality" ).val() + "&tripType=" + flightTypeVal + "&journeyStart="
			+ journeyStartCode + "&journeyEnd=" + journeyEndCode + "&departure=" + $( "#dtpStartDate" ).val() + "&returne="
			+ $( "#dtpStartDate2" ).val() + "&adult=" + $( "#adult" ).val() + "&child=" + $( "#child" ).val() + "&searchPage=1";
}

function modifySearchSubmit(){
	journeyStartCodeModify = "";
	journeyEndCodeModify = "";
	$( '.loadingPopup' ).removeClass( 'hide' );
	var journeyStart = $( "#journeyStartt" ).val();
	var journeyEnd = $( "#journeyEndd" ).val();
	var flightType = $( ".tripType" );
	var returnDate = $( "#dtpStartDate2Modify" ).val();
	var departureDate = $( "#dtpStartDateModify" ).val();
	var adult = $( "#adultt" ).val();
	var child = $( "#childd" ).val();
	// alert(adult.length+"---"+adult);
	var sumAdultChild = parseInt( adult ) + parseInt( child );

	var flightTypeVal;

	if ( isNotValidObject( journeyStart ) ) {
		$( "#journeyStartt" ).addClass( 'error' );
		$( '.loadingPopup' ).addClass( 'hide' );
	}
	if ( isNotValidObject( journeyEnd ) ) {
		$( "#journeyEndd" ).addClass( 'error' );
		$( '.loadingPopup' ).addClass( 'hide' );
	}
	if ( isNotValidObject( journeyStart ) || isNotValidObject( journeyEnd ) ) {
		$( '.loadingPopup' ).addClass( 'hide' );
		return false;
	}
	if ( flightType[ 0 ].checked ) {
		flightTypeVal = flightType[ 0 ].value;
	}
	else if ( flightType[ 1 ].checked ) {
		flightTypeVal = flightType[ 1 ].value;
	}
	else {
		flightTypeVal = flightType[ 2 ].value;
	}
	if ( flightTypeVal == 'O' ) {
		if ( isNotValidObject( departureDate ) ) {
			$( "#dtpStartDateModify" ).parent( '.date' ).addClass( 'datepicker-error' );
			$( '.loadingPopup' ).addClass( 'hide' );
			return false;
		}
		if ( isNotValidObject( departureDate ) ) {
			$( '.loadingPopup' ).addClass( 'hide' );
			return false;
		}
		if ( sumAdultChild > 10 ) {
			alert( "Total passenger's should not exceed limit of 10." );
			$( '.loadingPopup' ).addClass( 'hide' );
			return false;
		}
		if ( adult == 0 && child == 0 ) {
			alert( "Please select at least one passenger." );
			$( '.loadingPopup' ).addClass( 'hide' );
			return false;
		}

	}
	if ( flightTypeVal == 'R' ) {
		if ( isNotValidObject( departureDate ) ) {
			$( "#dtpStartDateModify" ).parent( '.date' ).addClass( 'datepicker-error' );
			$( '.loadingPopup' ).addClass( 'hide' );

		}
		if ( isNotValidObject( returnDate ) ) {
			$( "#dtpStartDate2Modify" ).parent( '.date' ).addClass( 'datepicker-error' );
			$( '.loadingPopup' ).addClass( 'hide' );
		}
		if ( isNotValidObject( departureDate ) || isNotValidObject( returnDate ) ) {
			$( '.loadingPopup' ).addClass( 'hide' );
			return false;
		}
		if ( sumAdultChild > 10 ) {
			alert( "Total passenger's should not exceed limit of 10." );
			$( '.loadingPopup' ).addClass( 'hide' );
			return false;
		}
		if ( adult == 0 && child == 0 ) {
			alert( "Please select at least one passenger." );
			$( '.loadingPopup' ).addClass( 'hide' );
			return false;
		}
	}

	if ( flightTypeVal == 'M' ) {
		if ( isNotValidObject( departureDate ) ) {
			$( "#dtpStartDateModify" ).parent( '.date' ).addClass( 'datepicker-error' );
			$( '.loadingPopup' ).addClass( 'hide' );
			return false;
		}
		if ( isNotValidObject( departureDate ) ) {
			$( '.loadingPopup' ).addClass( 'hide' );
			return false;
		}
		if ( sumAdultChild > 10 ) {
			alert( "Total passenger's should not exceed limit of 10." );
			$( '.loadingPopup' ).addClass( 'hide' );
			return false;
		}
		if ( adult == 0 && child == 0 ) {
			alert( "Please select at least one passenger." );
			$( '.loadingPopup' ).addClass( 'hide' );
			return false;
		}
		journeyStartCodeModify = "KTM";
		journeyEndCodeModify = "MTN";
	}
	// /////////////
	if ( flightTypeVal != 'M' ) {
		if ( journeyStart === journeyEnd ) {
			alert( "Source and Destination place cannot be same." );
			$( '.loadingPopup' ).addClass( 'hide' );
			return false;
		}
		if ( sectorToList != null && sectorToList.length > 0 ) {
			$.each( sectorToList, function( i, sectorToList ){
				if ( journeyStart.toUpperCase() == sectorToList.SectorName.toUpperCase() ) {
					journeyStartCodeModify = sectorToList.SectorCode;
					return false;
				}
			} );
			$.each( sectorToList, function( i, sectorToList ){
				if ( journeyEnd.toUpperCase() == sectorToList.SectorName.toUpperCase() ) {
					journeyEndCodeModify = sectorToList.SectorCode;
					return false;
				}
			} );
		}
	}

	if ( journeyStartCodeModify == "" ) {
		alert( "Please select the destination you wish to fly from" ); 
		$( '.loadingPopup' ).addClass( 'hide' );
		return false;
	}
	else {
		$( "#journeyStartCodeHiddenId" ).val( journeyStartCodeModify );
	}
	if ( journeyEndCodeModify == "" ) {
		alert( "Please select the destination you wish to fly to" );
		$( "#journeyEndd" ).val( "" );
		$( '.loadingPopup' ).addClass( 'hide' );
		return false;
	}
	else {
		$( "#journeyEndCodeHiddenId" ).val( journeyEndCodeModify );
	}
	// ///////

	document.forms[ 'modifySearchForm' ].submit();
}

function isValidObject( obj ){
	if ( obj != null && obj != '' && obj != undefined ) {
		return true;
	}
	return false;
}

function isNotValidObject( obj ){
	if ( obj == null || obj == '' || obj == undefined ) {
		return true;
	}
	return false;
}

function pass(){
	var fName = $( ".firstName" );

	// var fNameTrimVal = $.trim( fName );
	// $( ".firstName" ).val( fNameTrimVal );

	var lName = $( ".lastName" );
	// var lNameTrimVal = $.trim(lName);
	// $(".lastName").val(lNameTrimVal);

	/*
	 * for ( var i = 0; i < fName.length; ++i ) { $( "#firstName" + i ).hide(); if ( fName[ i ].value == '' || fName[ i ].value == null ) { $( "#firstName" + i ).show(); //$( "#firstName" ).focus(); // alert( "First name can not be empty" ); return; } }
	 */

	if ( fName.length == lName.length ) {
		var sameLength = fName.length;
		for ( var i = 0; i < sameLength; ++i ) {
			$( "#firstName" + i ).hide();
			$( "#lastName" + i ).hide();
			$( "#specialChar" + i ).hide();
			$( "#specialCharlast" + i ).hide();
			if ( fName[ i ].value == '' || fName[ i ].value == null ) {
				$( "#firstName" + i ).show();
				return;
			}
			else if ( ( fName[ i ].value != '' || fName[ i ].value != null ) ) {

				if ( !validateUserFirstName( fName[ i ].value ) ) {

					$( "#specialChar" + i ).show();

					return;
				}

			}
			if ( lName[ i ].value == '' || lName[ i ].value == null ) {

				$( "#lastName" + i ).show();
				return;
			}
			else if ( ( lName[ i ].value != '' || lName[ i ].value != null ) ) {

				if ( !validateUserFirstName( lName[ i ].value ) ) {

					$( "#specialCharlast" + i ).show();

					return;
				}

			}

		}
	}

	document.forms[ name = 'passengerform' ].submit();
}

function callpassengerDetails( flag ){
	// debugger;
	$( '.loadingPopup' ).removeClass( 'hide' );
	$( "#contField" ).val( flag );
	$.ajax( {
		url : '/booking/loginCheck', type : 'GET', success : function( data ){
			if ( data.loginFlag == false ) {
				$( "#loginpopup" ).trigger( "click" );
			}
			if ( data.loginFlag == true ) {
				// document.forms[ name = 'bookingDetailsForm' ].submit();
				window.location.href = '/booking/passengerDetails';
			}
		}
	} );

}

function loginFunctn(){
	// debugger;
	$( "#signupEmailSapn,#signupPassSapn" ).hide();

	var emailId = $( "#loginId" ).val();
	var emailIdTrimVal = $.trim( emailId );
	$( "#loginId" ).val( emailIdTrimVal );
	var password = $( "#loginPassword" ).val();

	var userNameCheck = validateEmail( emailId );

	if ( !userNameCheck ) {
		$( "#signupEmailSapn" ).show();
		$( "#loginId" ).focus();
		return false;
	}
	if ( password == '' ) {
		$( "#signupPassSapn" ).show();
		return false;
	}

	$( '.loadingPopup' ).removeClass( 'hide' );
	$.ajax( {
		url : '/booking/login', type : 'POST', data : {
			"userName" : emailId, "password" : password
		}, success : function( data ){
			if ( data.loginFlag == false ) {
				document.getElementById( "userCheckId" ).innerHTML = data.statusDesc;
				$( '.loadingPopup' ).addClass( 'hide' );
				$( "#userCheckId" ).css( 'display', 'block' );

			}
			else if ( data.loginFlag == true && $( "#contField" ).val() == 'Continue' ) {
				// $( "#bookingDetailsForm" ).submit();
				window.location.href = '/booking/passengerDetails';
			}
			else if ( data.loginFlag == true && $( "#contField" ).val() == '' ) {

				$( '#usdDiv' ).load( document.URL + ' #usdDiv' );

				setTimeout( function(){
					$( '.loadingPopup' ).addClass( 'hide' );
					$( "#closeBtn" ).trigger( "click" );
				}, 3000 );
			}
			else if ( data.loginFlag == true && $( "#contField" ).val() == 'bookingHistory' ) {
				window.location.href = '/booking/bookingHistoryPage';
			}
			else if ( data.loginFlag == true && $( "#contField" ).val() == 'cancelTicket' ) {
				window.location.href = '/';
			}
		}
	} );
}

function signUpFunctn(){
	// debugger;
	$( "#signupFNameSapn,#signupLNameSapn,#signupEsapn,#signupPsapn,#signupMspan" ).hide();

	var firstName = $( "#signupFirstName" ).val();
	var firstNameVal = $.trim( firstName );
	$( "#signupFirstName" ).val( firstNameVal );

	var lastName = $( "#signupLastName" ).val();
	var lastNameVal = $.trim( lastName );
	$( "#signupLastName" ).val( lastNameVal );

	var emailId = $( "#signupEmailId" ).val();
	var emailIdVal = $.trim( emailId );
	$( "#signupEmailId" ).val( emailIdVal );

	var password = $( "#signupPassword" ).val();
	var mobileNo = $( "#signupMobileNumber" ).val();
	var countryCode = $( "#signupCountryCode" ).val();
	var fName = validateUserFirstName( firstName );
	var lName = validateUserLastName( lastName );
	var eId = validateEmail( emailId );
	var passwrdcheck = validatePassword( password );

	if ( $.trim( $( '#signupFirstName' ).val() ) == '' ) {
		$( "#signupFNameSapn" ).show();
		$( "#signupFirstName" ).focus();
		$( "#signupFirstName" ).get( 0 ).setSelectionRange( 0, 0 );
		return false;
	}

	if ( !fName ) {
		$( "#signupFsapnS" ).show();
		$( "#signupFirstName" ).focus();
		return false;
	}

	if ( $.trim( $( '#signupLastName' ).val() ) == '' ) {
		$( "#signupLNameSapn" ).show();
		$( "#signupLastName" ).focus();
		$( "#signupLastName" ).get( 0 ).setSelectionRange( 0, 0 );
		return false;
	}

	if ( !lName ) {
		$( "#signupLsapnS" ).show();
		$( "#signupLastName" ).focus();
		return false;
	}

	if ( !eId ) {
		$( "#signupEsapn" ).show();
		$( "#signupEmailId" ).focus();
		return false;
	}
	if ( !passwrdcheck ) {
		$( "#signupPsapn" ).show();
		$( "#signupPassword" ).focus();
		return false;
	}
	if ( mobileNo == '' ) {
		$( "#signupMspan" ).show();
		$( "#signupMobileNumber" ).focus();
		return false;
	}

	$( '.loadingPopup' ).removeClass( 'hide' )

	$.ajax( {
		url : '/booking/signUp',
		type : 'POST',
		data : {
			"firstName" : firstName, "lastName" : lastName, "emailId" : emailId, "password" : password, "mobileNumber" : mobileNo,
			"countryCode" : countryCode
		}, success : function( data ){
			if ( data.loginFlag == false ) {
				document.getElementById( "userCheckIdSignUp" ).innerHTML = data.statusDesc;
				$( '.loadingPopup' ).addClass( 'hide' );
				$( "#userCheckIdSignUp" ).css( 'display', 'block' );
			}
			else if ( data.loginFlag == true && $( "#contField" ).val() == 'Continue' ) {
				// $( "#bookingDetailsForm" ).submit();
				window.location.href = '/booking/passengerDetails';
			}
			else if ( data.loginFlag == true && $( "#contField" ).val() == '' ) {
				$( '#usdDiv' ).load( document.URL + ' #usdDiv' );
				setTimeout( function(){
					$( '.loadingPopup' ).addClass( 'hide' );
					$( "#closeBtnSignUp" ).trigger( "click" );
				}, 1000 );

			}
			else if ( data.loginFlag == true && $( "#contField" ).val() == 'bookingHistory' ) {
				window.location.href = '/booking/bookingHistoryPage';
			}
			else if ( data.loginFlag == true && $( "#contField" ).val() == 'cancelTicket' ) {
				window.location.href = '/';
			}

		}
	} );
}

function closePopup(){
	// debugger;
	$( "#contField" ).val( "" );
	document.getElementById( "userCheckIdSignUp" ).innerHTML = "";
	document.getElementById( "userCheckId" ).innerHTML = "";
	document.getElementById( "forgotPasswordCheckId" ).innerHTML = "";

}

function forgotPasswordFunctn(){
	$( "#forgotEmailsapn" ).hide();
	var userId = $( "#forgotPasswordUserId" ).val();
	var eId = validateEmail( userId );
	if ( !eId ) {
		$( "#forgotEmailsapn" ).show();
		return false;
	}

	$( '.loadingPopup' ).removeClass( 'hide' )
	$
			.ajax( {
				url : '/booking/forgotpassword',
				type : 'POST',
				data : {
					"userId" : userId
				},
				success : function( data ){
					if ( data.statusCode == 'NP001' ) {
						document.getElementById( "forgotPasswordCheckId" ).innerHTML = "We have sent an email with link to reset your password, Please check your inbox!";
						$( '#forgotPasswordUserId' ).hide();
						$( '#forgetButtonId' ).hide();
						$( '.loadingPopup' ).addClass( 'hide' );
						$( "#openBtn" ).show();
					}
					else if ( data.statusCode != "NP001" ) {
						document.getElementById( "forgotPasswordCheckId" ).innerHTML = data.statusDesc;
						$( '.loadingPopup' ).addClass( 'hide' );
					}
				}
			} );
}

var sectorFromList = null;
var sectorToList = null;
// var sectorCodeNameArray = [];
$( document ).ready( function(){
	$.ajax( {
		async : false, url : '/booking/getSectorList', type : 'GET', success : function( data ){
			sectorFromList = JSON.parse( data.fromSectors );
			sectorToList = JSON.parse( data.toSectors );
		}
	} );
} );

function showFromSectors( searchText ){

	// $( "#fromSectors" ).addClass( "hide" );
	var table = "";
	$( "#fromSectors" ).html( "" );
	if ( sectorFromList != null && sectorFromList.length > 0 ) {
		$.each( sectorFromList, function( i, sectorFromList ){

			if ( searchText == null || searchText == '' || searchText == undefined ) {
				table = table.concat( "<li>" );
				table = table.concat( "<a onclick=\"doFromSelect('" + sectorFromList.SectorName + "')\" href='javascript:void(0);'><span>"
						+ sectorFromList.SectorCode + "</span>" + sectorFromList.SectorName + "</a>" );
				table = table.concat( "</li>" );
			}
			else if ( has_words( String( sectorFromList.SectorName ), searchText.value, false )
					|| has_words( String( sectorFromList.SectorCode ), searchText.value, false ) ) {
				table = table.concat( "<li>" );
				// table = table.concat( "<a onclick=\"doFromSelect('" + sectorFromList.SectorCode + " " + sectorFromList.SectorName
				table = table.concat( "<a onclick=\"doFromSelect('" + sectorFromList.SectorName + "')\" href='javascript:void(0);'><span>"
						+ sectorFromList.SectorCode + "</span>" + sectorFromList.SectorName + "</a>" );
				table = table.concat( "</li>" );
			}
		} );
		if ( table != null && table != '' && table != undefined ) {
			$( "#fromSectors" ).html( table );
			$( "#fromSectors" ).removeClass( "hide" );
			$( "#journeyStart" ).removeClass( "error" );// //////hideError

		}
		else {
			$( "#fromSectors" ).html( "" );
			$( "#fromSectors" ).addClass( "hide" );
			$( "#journeyStart" ).addClass( "error" );// //////hideError
		}
	}
}

function showToSectors( searchText ){
	// $( "#toSectors" ).addClass( "hide" );
	var table = "";
	$( "#toSectors" ).html( "" );
	if ( sectorToList != null && sectorToList.length > 0 ) {
		$.each( sectorToList, function( i, sectorToList ){
			if ( searchText == null || searchText == '' || searchText == undefined ) {
				table = table.concat( "<li>" );
				table = table.concat( "<a onclick=\"doToSelect('" + sectorToList.SectorName + "')\" href='javascript:void(0);'><span>"
						+ sectorToList.SectorCode + "</span>" + sectorToList.SectorName + "</a>" );
				table = table.concat( "</li>" );
			}
			else if ( has_words( String( sectorToList.SectorName ), searchText.value, false )
					|| has_words( String( sectorToList.SectorCode ), searchText.value, false ) ) {
				table = table.concat( "<li>" );
				// table = table.concat( "<a onclick=\"doToSelect('" + sectorToList.SectorCode + " " + sectorToList.SectorName
				table = table.concat( "<a onclick=\"doToSelect('" + sectorToList.SectorName + "')\" href='javascript:void(0);'><span>"
						+ sectorToList.SectorCode + "</span>" + sectorToList.SectorName + "</a>" );
				table = table.concat( "</li>" );
			}
		} );
		if ( table != null && table != '' && table != undefined ) {
			$( "#toSectors" ).html( table );
			$( "#toSectors" ).removeClass( "hide" );
			$( "#journeyEnd" ).removeClass( "error" )// //////hideError
		}
		else {
			$( "#toSectors" ).addClass( "hide" );
			$( "#journeyEnd" ).addClass( "error" )// //////hideError
		}
	}
}

function doFromSelect( elm ){
	$( "#journeyStart" ).val( elm );
	$( ".search-list" ).addClass( "hide" );
}

function doToSelect( elm ){
	$( "#journeyEnd" ).val( elm );
	$( ".search-list" ).addClass( "hide" );
}

function has_words( str, words, caseSensitive ){
	var result = false;
	var text = caseSensitive ? str : str.toLowerCase();
	var toBeSearchedText = caseSensitive ? words : words.toLowerCase();

	var textArr = toBeSearchedText.trim().split( /\s+/ );
	for ( var i = 0; i < textArr.length; i++ ) {
		if ( text.indexOf( textArr[ i ] ) > -1 ) {
			result = true;
			break;
		}
	}
	return result;
}

function bookFlightMethod( flag ){
	$( "#contField" ).val( flag );
	$.ajax( {
		url : '/booking/loginCheck', type : 'GET', success : function( data ){
			if ( data.loginFlag == false ) {
				$( "#loginpopup" ).trigger( "click" );
			}
			if ( data.loginFlag == true ) {
				if ( flag === "bookingHistory" ) {
					window.location.href = '/booking/bookingHistoryPage';
				}
				else if ( flag === "cancelTicket" ) {
					window.location.href = '/';
				}
			}
		}
	} );

}

function submitForm( flag ){

	$( "#updateSpanfName,#updateSpanfNameSP,#updateSpanLName,#updateSpanLNameSP,#updateSpanMobNo,#updateSpanEmail" ).hide();

	$( "#changeOldPass, #changeNewPass, #changeConfrmPass,#updatePassMatch" ).hide();

	var updateSignupFName = $( "#signupFirstName" ).val();
	var signupFNameTrimVal = $.trim( updateSignupFName );
	$( "#signupFirstName" ).val( signupFNameTrimVal );

	var updateSignupLName = $( "#signupLastName" ).val();
	var signupLNameTrimVal = $.trim( updateSignupLName );
	$( "#signupLastName" ).val( signupLNameTrimVal );

	var updateMobileNo = $( "#signupMobileNumber" ).val();

	var updateEmailId = $( "#signupEmailId" ).val();
	var signupEmailIdTrimVal = $.trim( updateEmailId );
	$( "#signupEmailId" ).val( signupEmailIdTrimVal );

	// var updatefName = validateUserFirstName( updateSignupFName );
	var fName = validateUserFirstName( updateSignupFName );
	var lName = validateUserLastName( updateSignupLName );
	var updateEid = validateEmail( updateEmailId );

	// Change Password
	var oldPass = $( "#password" ).val();
	var newPass = $( "#newPassword" ).val();
	var confrmPass = $( "#confirmPassword" ).val();

	var validateNewPass = validatePassword( newPass );

	if ( flag == 'modifyUser' ) {
		if ( updateSignupFName == '' ) {
			$( "#updateSpanfName" ).show();
			$( "#updateSpanfNameSP" ).hide();
			return false;
		}

		if ( !fName ) {
			$( "#updateSpanfNameSP" ).show();
			$( "#updateSpanfName" ).hide();
			$( "#signupFirstName" ).focus();
			return false;
		}
		if ( updateSignupLName == '' ) {

			$( "#updateSpanLName" ).show();
			$( "#updateSpanLNameSP" ).hide();
			$( "#signupLastName" ).focus();
			return false;
		}
		if ( !lName ) {
			$( "#updateSpanLNameSP" ).show();
			$( "#updateSpanLName" ).hide();
			$( "#signupLastName" ).focus();
			return false;
		}
		if ( updateMobileNo == '' ) {
			$( "#updateSpanMobNo" ).show();
			return false;
		}
		if ( !updateEid ) {
			$( "#updateSpanEmail" ).show();
			$( "#signupEmailId" ).focus();
			return false;
		}
		$( '.loadingPopup' ).removeClass( 'hide' );
		document.forms[ 0 ].action = flag;
		document.forms[ 0 ].submit();
	}
	else if ( flag == 'changePassword' ) {
		if ( oldPass == '' ) {
			$( "#changeOldPass" ).show();
			return false;
		}
		if ( !validateNewPass ) {
			$( "#changeNewPass" ).show();
			return false;
		}
		if ( confrmPass == '' ) {
			$( "#changeConfrmPass" ).show();
			return false;
		}
		if ( newPass != confrmPass ) {
			$( "#updatePassMatch" ).show();
			return false;
		}
		$( '.loadingPopup' ).removeClass( 'hide' );
		document.forms[ 0 ].action = flag;
		document.forms[ 0 ].submit();

	}
	else {
		$( '.loadingPopup' ).removeClass( 'hide' );
		document.forms[ 0 ].action = flag;
		document.forms[ 0 ].submit();
	}
}

function priceView( type, flightNo, timing, flightId ){
	// debugger;
	var outboundAvailable = 'Yes';
	var inboundAvailable = 'Yes';
	try {
		if ( document.getElementById( "outboundAvailable" ) != undefined && document.getElementById( "outboundAvailable" ) != null ) {
			outboundAvailable = document.getElementById( "outboundAvailable" ).value;
		}
		if ( document.getElementById( "inboundAvailable" ) != undefined && document.getElementById( "inboundAvailable" ) != null ) {
			inboundAvailable = document.getElementById( "inboundAvailable" ).value;
		}
	} catch ( err ) {

	}

	$.ajax( {
		url : '/booking/priceView',
		type : 'POST',
		data : {
			"type" : type, "flightNo" : flightNo, "timing" : timing, "flightId" : flightId, "outboundAvailable" : outboundAvailable,
			"inboundAvailable" : inboundAvailable

		}, success : function( data ){
			if ( data.boundTypeOfFlight == "outbound" ) {
				document.getElementById( "classCodeOutbound" ).innerHTML = data.flightClassCodeOutbound;
				document.getElementById( "departureTime" ).innerHTML = data.departureTimeOutbound;
				document.getElementById( "arrivalTime" ).innerHTML = data.arrivalTimeOutbound;
				document.getElementById( "totalTimeoutbnd" ).innerHTML = data.totalTimeOutbound;

			}
			else if ( data.boundTypeOfFlight == "inbound" ) {
				document.getElementById( "classCodeInbound" ).innerHTML = data.flightClassCodeInbound;
				document.getElementById( "departureTimeInb" ).innerHTML = data.departureTimeInbound;
				document.getElementById( "arrivalTimeInb" ).innerHTML = data.arrivalTimeInbound;
				document.getElementById( "totalTimeoutbndInb" ).innerHTML = data.totalTimeInbound;

			}
			if ( outboundAvailable != 'No' || inboundAvailable != 'No' ) {
				var currency = 'NPR';
				currency = data.currency;
				var divs = document.getElementsByClassName( "currencyPrint" );
				[].slice.call( divs ).forEach( function( div ){
					div.innerHTML = currency;
				} );
				if ( document.getElementById( "adultBaseFare" ) != undefined ) {
					document.getElementById( "adultBaseFare" ).innerHTML = data.baseFareAdult;
				}
				if ( document.getElementById( "childBaseFare" ) != undefined ) {
					document.getElementById( "childBaseFare" ).innerHTML = data.baseFareChild;
				}
				document.getElementById( "surcharge" ).innerHTML = data.fuelSurcharges;
				document.getElementById( "totalTax" ).innerHTML = data.totalTax;
				document.getElementById( "totalCharge" ).innerHTML = data.totalCharges;
				if ( outboundAvailable === "Yes" ) {
					$( "#outBndDta" ).show();
				}
				if ( inboundAvailable === "Yes" ) {
					$( "#inbnd" ).show();
				}
				$( "#summary" ).show();

			}

		}
	} );

}
var lastSelectedFlightType = "";
function mountainFlight( flightType ){
	// debugger;
	if ( lastSelectedFlightType === "M" || flightType === "M" ) {
		$( "#journeyStart" ).val( "" );
		$( "#journeyEnd" ).val( "" );
		if ( flightType === "M" ) {
			$( "#journeyStart" ).val( 'KATHMANDU' );
			$( "#journeyEnd" ).val( 'KATHMANDU' );
			$( "#journeyStart" ).attr( "readonly", "true" );
			$( "#journeyEnd" ).attr( "readonly", "true" );
			$( "#journeyStart" ).removeAttr( "onclick" );
			$( "#journeyEnd" ).removeAttr( "onclick" );
			$( "#journeyStart" ).removeAttr( "onkeyup" );
			$( "#journeyEnd" ).removeAttr( "onkeyup" );
			journeyStartCode = "KTM";
			journeyEndCode = "MTN";
		}
		else {
			$( "#journeyStart" ).attr( "onclick", "showFromSectors( this )" );
			$( "#journeyEnd" ).attr( "onclick", "showToSectors( this )" );
			$( "#journeyStart" ).attr( "onkeyup", "showFromSectors( this )" );
			$( "#journeyEnd" ).attr( "onkeyup", "showToSectors( this )" );
			$( "#journeyStart" ).removeAttr( "readonly" );
			$( "#journeyEnd" ).removeAttr( "readonly" );
		}
	}
	lastSelectedFlightType = flightType;

}

var lastSelectedFlightTypeModify = "";
function mountainFlightModify( flightType ){
	// debugger;
	if ( lastSelectedFlightTypeModify === "M" || flightType === "M" ) {
		$( "#journeyStartt" ).val( "" );
		$( "#journeyEndd" ).val( "" );
		if ( flightType === "M" ) {
			$( "#journeyStartt" ).val( 'KATHMANDU' );
			$( "#journeyEndd" ).val( 'KATHMANDU' );
			$( "#journeyStartt" ).attr( "readonly", "true" );
			$( "#journeyEndd" ).attr( "readonly", "true" );
			$( "#journeyStartt" ).removeAttr( "onclick" );
			$( "#journeyEndd" ).removeAttr( "onclick" );
			$( "#journeyStartt" ).removeAttr( "onkeyup" );
			$( "#journeyEndd" ).removeAttr( "onkeyup" );
			journeyStartCodeModify = "KTM";
			journeyEndCodeModify = "MTN";
		}
		else {
			$( "#journeyStartt" ).attr( "onclick", "showFromSectors( this )" );
			$( "#journeyEndd" ).attr( "onclick", "showToSectors( this )" );
			$( "#journeyStartt" ).attr( "onkeyup", "showFromSectors( this )" );
			$( "#journeyEndd" ).attr( "onkeyup", "showToSectors( this )" );
			$( "#journeyStartt" ).removeAttr( "readonly" );
			$( "#journeyEndd" ).removeAttr( "readonly" );
		}
	}
	lastSelectedFlightTypeModify = flightType;

}

function resetPasswordFunctn(){
	// debugger;

	var newPassword = $( "#newPassword" ).val();
	var confirmPassword = $( "#confirmPassword" ).val();
	var passwordResetLink = $( "#passwordResetLink" ).val();

	if ( newPassword == '' ) {
		$( "#newPassEmpty" ).show();
		$( "#newPassword" ).focus();
		return false;
	}
	var passwrdcheck = validatePassword( newPassword );

	if ( !passwrdcheck ) {
		$( "#newPassIncorrect" ).show();
		$( "#newPassword" ).focus();
		return false;
	}
	if ( confirmPassword == '' ) {
		$( "#confirmPassEmpty" ).show();
		$( "#confirmPassword" ).focus();
		return false;
	}

	if ( confirmPassword != newPassword ) {
		$( "#confirmPassNotMatch" ).show();
		$( "#confirmPassword" ).focus();
		return false;
	}
	$( '.loadingPopup' ).removeClass( 'hide' );
	var hostWithPort = window.location.host;

	$
			.ajax( {
				url : '/booking/passwordProcess',
				type : 'POST',
				data : {
					"newPassword" : newPassword, "confirmPassword" : confirmPassword, "passwordResetLink" : passwordResetLink
				},
				success : function( statusCode ){
					if ( statusCode == 'NP001' ) {
						document.getElementById( "resetPasswordMessageDIv" ).innerHTML = "Password changed successfully, Now you can login with your new password. <br><a style='background:#cf2627; color:#fff; font-size:14px; margin-top:15px; padding:5px 30px;' href='http://"
								+ hostWithPort + "'>Back to Shreeairlines</a>";
						$( "#newPassword" ).val( '' );
						$( "#confirmPassword" ).val( '' );
						$( '.reset-passwordblock' ).addClass( 'hide' );
						$( '.loadingPopup' ).addClass( 'hide' );
						$( "#resetPasswordMessageDIv" ).css( 'display', 'block' );
					}
					else {
						document.getElementById( "resetPasswordMessageDIv" ).innerHTML = statusCode
								+ '<br><a style="background:#cf2627; color:#fff; font-size:14px; margin-top:15px; padding:5px 30px;" href="http://'
								+ hostWithPort + '">Back to Shreeairlines</a>';
						$( "#newPassword" ).val( '' );
						$( "#confirmPassword" ).val( '' );
						$( '.reset-passwordblock' ).addClass( 'hide' );
						$( '.loadingPopup' ).addClass( 'hide' );
						$( "#resetPasswordMessageDIv" ).css( 'display', 'block' );
					}

				}
			} );
}
