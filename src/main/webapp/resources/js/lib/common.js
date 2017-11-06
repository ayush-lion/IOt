String.prototype.startsWith = function( str ){
	return ( this.match( "^" + str ) == str );
}
$( document ).ready( function( e ){
	$( "input[readonly]" ).addClass( 'gray_text' );
	$( "#idSearchCriteria" ).val( "" );
	$( "#idSearchCriteriaValue" ).val( "" );

	a = $( '.inner_section' ).width();
	b = $( '.qrcLeft' ).width();
	c = a - b;
	// alert($('.inner_section').width() + "" + $('.qrcLeft').width());
	$( '.manageGISRight' ).css( {
		"width" : c - 32
	} );

	$( 'body' ).click( function(){
		$( '#invoice_details' ).hide();
		// alert('hide');
	} );

	$( '#invoiceDetailsClick' ).toggle( function(){
		$( '#invoice_details' ).slideDown();
		event.stopPropagation();
	}, function(){
		$( '#invoice_details' ).slideUp();
	} );

	$( 'ul.tabbing li a' ).click( function(){

		$( ".table" ).hide();
		$( $( this ).attr( "href" ) ).show();

		$( '.selectedOne' ).removeClass( 'selectedOne' );
		$( this ).addClass( 'selectedOne' );

	} );

	$( '.tcal' ).attr( 'readonly', 'true' );

	/*----------For open and close  table--------------*/
	$( ".viewLmsTable" ).hide();
	$( ".LmsTable>h4>span" ).click( function(){
		$( this ).parent().next( ".viewLmsTable" ).slideToggle( "1000" );
		$( this ).toggleClass( 'lmsPlusImage' );
	} );

	/*----------For open and close table for QRC tickets only--------------*/
	$( ".ticketRemarks" ).show();
	$( ".ticketRemarks>h4>span" ).click( function(){
		$( this ).parent().next( ".viewticketRemarks" ).slideToggle( "1000" );
		$( this ).toggleClass( 'lmsPlusImageRemarks' );
	} );

	/*----------For open and close  table--------------*/

	/* Radio and checkbox */
	$( ' .label_radio, .label_check' ).click( function(){
		setupLabel();
	} );
	setupLabel();
	/* End of Radio and checkbox */

	/** ***** filter search ******** */
	jQuery.expr[ ':' ].Contains = function( a, i, m ){
		return ( a.textContent || a.innerText || "" ).toUpperCase().indexOf( m[ 3 ].toUpperCase() ) >= 0;
	};

	function listFilter( header, list ){
		$( '.searchAssignRoles' ).change( function(){
			var filter = $( this ).val();
			if ( filter ) {
				$( list ).find( "a:not(:Contains(" + filter + "))" ).parent().parent().slideUp( function(){
					$( list ).find( "ul" ).each( function(){
						if ( $( this ).children( "li:visible" ).length === 0 )
							$( this ).parent().parent().slideUp();
					} );
				} );
				$( list ).find( "a:Contains(" + filter + ")" ).parent().parent().slideDown();
			}
			else {
				$( list ).find( "ul, li" ).slideDown();
			}
		} ).keyup( function(){
			$( this ).change();
		} );
	}
	$( function(){
		listFilter( $( ".searchAssignRoles" ), $( "#searchAssignRolesList" ) );
	} );

	/** ***** End of filter search ******** */

	$( '#closePopup' ).click( function( e ){
		$( '.modelPopupDiv, .overlayDiv' ).fadeOut();
	} );

} );

function fillDataPrimaryMacAddr( value, id ){
	$( '.loadingPopup' ).removeClass( 'hide' );
	crmDwr.getPrimaryMacAdd( value, function( result ){
		if ( result != null ) {
			dwr.util.setValue( id, result );
		}
		$( '.loadingPopup' ).addClass( 'hide' );
	} );
}

function openUploadPopUp( url, module ){
	var flag = true;
	if ( module == 'FINANCE' ) {
		flag = anyOne();
	}
	if ( flag ) {
		var value = document.getElementById( "uploadDocCRF" ).value;
		var popupString = "<a href='#' id='closePopup'>X</a>"
				+ "<h4>Upload Reference Document</h4>"
				+ "<iframe src='"
				+ url
				+ "/files/upload/"
				+ encodeURIComponent( module )
				+ "/"
				+ encodeURIComponent( value )
				+ "' scrolling='yes' frameborder='0' style='border: none; overflow: hidden; width: 755px; height: 360px;' allowTransparency='true'></iframe>";
		document.getElementById( "uploadDocPPId" ).innerHTML = popupString;
		$( '.modelPopupDiv, .overlayDiv' ).fadeIn();
		$( '#closePopup' ).click( function( e ){
			$( '.modelPopupDiv, .overlayDiv' ).fadeOut();
		} );
	}
}

function setupLabel(){
	if ( $( '.label_radio input' ).length ) {
		$( '.label_radio' ).each( function(){
			$( this ).removeClass( 'radio_on' );
		} );
		$( '.label_radio input:checked' ).each( function(){
			$( this ).parent( 'label' ).addClass( 'radio_on' );
		} );
	}
	;
	if ( $( '.label_check input' ).length ) {
		$( '.label_check' ).each( function(){
			$( this ).removeClass( 'check_on' );
		} );
		$( '.label_check input:checked' ).each( function(){
			$( this ).parent( 'label' ).addClass( 'check_on' );
		} );
	}
	;
};

function validateByRegexID( regexId, strValue ){
	var regexElement = document.getElementById( regexId );
	if ( null != regexElement && null != strValue ) {
		var regexValue = regexElement.value;
		return validateByRegex( regexValue, strValue );
	}
	return false;
}
function validateByRegex( regex, strValue ){
	if ( null != regex && null != strValue ) {
		var regexExp = new RegExp( regex );
		return result = regexExp.test( strValue );
	}
	return false;
}
/*
 * function validateMobile( mobileNo ){ mobileNo = Number( mobileNo ); return validateByRegexID( "mobileNumberRegex", mobileNo ); }
 */

function validateMobile( mobileNo ){
	var phoneNo = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
	var pattern = phoneNo.test( mobileNo );
	return pattern;
}

function getMobileMesg(){
	var regexElement = document.getElementById( "mobileNumberMesg" );
	if ( null != regexElement ) {
		return regexElement.value;
	}
	return '';
}
function validateEmail( emailID ){
	var emailRegex = "[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}";
	var res = validateByRegex( emailRegex, emailID );
	if ( res ) {
		var commaRegex = /,/g;
		res = !commaRegex.test( emailID );
	}
	return res;
}
function validatePassword( password ){
	var passRegex = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)([a-zA-Z0-9\\W]{8,15})";
	var res = validateByRegex( passRegex, password );
	if ( res ) {
		var spaceRegex = /\s/g;
		res = !spaceRegex.test( password );
	}
	return res;
}

function validateAlphanumericSpace( value ){
	// var regexExp = /^([0-9\s]+[a-zA-Z]|[a-zA-Z])[0-9a-zA-Z\s]*$/g;
	var regexExp = /^[a-zA-Z\'.,\-\s0-9]*$/g;
	var res = regexExp.test( value );
	return res;
}

function validateAlphanumericNameCRF( value ){
	var flag = true;
	if ( document.getElementById( 'connectionTypeCRF' ) != null ) {
		var connType = $( '#connectionTypeCRF' ).val();
		if ( connType != 'Ind' && connType != 'Prop' ) {
			if ( value.length > 2 && isNaN( value ) ) {
				return flag;
			}
		}
		else if ( connType == 'Prop' ) {
			if ( value.length > 0 && validateCustomerFirstNameForAlphaNumeric( value ) ) {
				return flag;
			}
		}
		else {
			if ( value.length > 0 && validateCustomerFirstName( value ) ) {
				return flag;
			}
		}
	}
	// if ( flag ) {
	// // var regexExp = /^[a-zA-Z\'.\s0-9]*$/g;
	// // var res = regexExp.test( value );
	// return validAlphaNameSpaceDot( value );
	// }
	// else {
	// if ( !isNaN( value ) ) {
	// return flag;
	// }
	// }
	return !flag;
}

function validAlphaNameSpaceDot( str ){
	return /^[a-zA-Z\'.\s]+$/.test( str );
}
function validateLatitude( value ){
	var regexExp = /^([0-9]*){0,}((\.[0-9]{1,})?)$/g;
	var result = regexExp.test( value );
	return result;
}

function validateSocietyName( value ){
	var regexExp = /^[^\-]*$/g;
	var result = regexExp.test( value );
	return result;
}

function checkPaidAmount( value ){
	var value_regex = /^(([0-9]{1,8}))((\.[0-9]{1,2})?)$/i;
	var res = value_regex.test( value );
	return res;
}

function checkForZero( value ){
	if ( value != 0 ) {
		return true;
	}
	else {
		return false;
	}
}

function validateAddReciptRange( value ){
	var rangeRegex = /^[0-9]{1,}$/g;
	var res = rangeRegex.test( value );
	return res;
}
function validateNumericMobileSearch( value ){
	var regex = /^[0-9]{10}$/g;
	var res = regex.test( value );
	return res;
}

function validatePin( value ){
	value = Number( value );
	var regex = /^[0-9]{6}$/g;
	var res = regex.test( value );
	return res;
}

function validateMacAddAddress( value ){
	var macRegex = /^[0-9a-f]{4}[.][0-9a-f]{4}[.][0-9a-f]{4}$/g;
	var res = macRegex.test( vale );
	return res;
}
function validatePassport( value ){
	var passPortRegex = /^[0-9a-zA-Z]{7,15}$/g;
	var res = passPortRegex.test( value );
	return res;
}
function validateTextRegex_2_45( value ){
	var regex = /^[A-Za-z][a-zA-Z0-9-\s\/().&']{2,45}$/g;
	var res = regex.test( value );
	return res;
}
function validateTextRegex_3_28( value ){
	var regex = /^[A-Za-z][a-zA-Z0-9-\s\/().&']{2,28}$/g;
	var res = regex.test( value );
	return res;
}
function validateTextRegex_3_50( value ){
	var regex = /^[A-Za-z][a-zA-Z0-9-\s\/().&']{2,50}$/g;
	var res = regex.test( value );
	return res;
}
/*
 * function validateUserFirstName( value ){ var regex = /^[a-zA-Z]{1}[a-zA-Z\']{0,29}$/g; var res = regex.test( value ); return res; }
 */

function validateUserFirstName( fName ){
	/*var regex = /^[a-zA-Z0-9]*[a-zA-Z]+[0-9]*$/;*/
	/*var regex =/^[a-zA-Z]{1}[a-zA-Z\s.']{0,29}$/;*/
	var regex = /^[A-Za-z _]*[A-Za-z][A-Za-z _.]*$/;
	var res = regex.test( fName );
	return res;
}
function validateUserLastName( lName ){
	/*var regex = /^[a-zA-Z0-9]*[a-zA-Z]+[0-9]*$/;*/
	/*var regex =/^[a-zA-Z]{1}[a-zA-Z\s.']{0,29}$/;*/
	var regex = /^[A-Za-z _]*[A-Za-z][A-Za-z _.]*$/;
	var res = regex.test( lName );
	return res;
}

function validateUserPartnerName( value ){
	var regex = /^[a-zA-Z]{1}[a-zA-Z\'\.\s]{0,49}$/g;
	var res = regex.test( value );
	return res;
}
function validateCustomerFirstName( value ){
	var regex = /^[a-zA-Z]{1}[a-zA-Z\'\.\s]{0,49}$/g;
	var res = regex.test( value );
	return res;
}
function validateCustomerFirstNameForAlphaNumeric( value ){
	var regex = /^[a-zA-Z]{1}[a-zA-Z0-9\'\.\s]{0,49}$/g;
	var res = regex.test( value );
	return res;
}
function validateUserName( value ){
	var regex = /^[a-zA-Z\']{3,30}$/g;
	var res = regex.test( value );
	return res;
}
function validateCustomerName( value ){
	var regex = /^[a-zA-Z\']{3,45}$/g;
	var res = regex.test( value );
	return res;
}
function validatePanGirNo( value ){
	var regex = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/g;
	var res = regex.test( value );
	return res;
}
function validateCustomerCategory( value ){
	var regex = /^[a-zA-Z]+$$/g;
	var res = regex.test( value );
	return res;
}
function validateUserId( value ){
	var regex = /^[a-zA-Z_]{3,128}$/g;
	var res = regex.test( value );
	return res;
}

function validateNames( value ){
	var regex = /^[a-zA-Z0-9_\s]{3,50}$/g;
	var res = regex.test( value );
	return res;
}
function validateCRF( value ){
	// var regex = /^RA[0-9]{6}|EA[0-9]{6}$/i;
	var regex = /^[0-9]{8}$/;
	var res = regex.test( value );
	return res;
}
function validateAlphanumericUnderScore( value ){
	var regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_]+$$/g;
	var res = regex.test( value );
	return res;
}
function validateOltNodeId( value ){
	var oltNodeRegex = /^([0-9\s]+[a-zA-Z]|[a-zA-Z])[0-9a-zA-Z\s]*$/;
	var res = oltNodeRegex.test( value );
	return res;
}

function digits( value ){
	var digitRegex = /^[0-9]*$/;
	var res = digitRegex.test( value );
	return res;
}
function validateAadharNo( value ){
	var aadharRegex = /^[0-9]{12,12}$/g;
	var res = aadharRegex.test( value );
	return res;
}

function validateAlphabetOrNumber( value ){
	var alphaNumericSpaceRegex = /^[a-zA-Z0-9]*$/g;
	var res = alphaNumericSpaceRegex.test( value );
	return res;
}

function validateAlphanumericSimple( value ){
	var alphaNumericSpaceRegex = /^([0-9]+[a-zA-Z]|[a-zA-Z]+[0-9])[a-zA-Z0-9]*$/g;
	var res = alphaNumericSpaceRegex.test( value );
	return res;
}
function checkHexadecimal( value ){
	// var value_regex = /^[0-9a-f]{4}[.][0-9a-f]{4}[.][0-9a-f]{4}$/i;
	var value_regex = /^([0-9a-fA-F]{4}[.-]){2}[0-9a-fA-F]{4}$/i;
	var res = value_regex.test( value );
	return res;
}
function customerProfileSearch(){
	var criteria = document.getElementById( "idSearchCriteria" );
	var criteriaValue = document.getElementById( "idSearchCriteriaValue" );
	if ( criteria.value == "" || criteriaValue.value == "" ) {
		alert( "Please select search criteria and provide search criteria value" );
		return false;
	}
	else if ( ( criteria.value == "rmn" || criteria.value == "rtn" || criteria.value == "contactno" ) && isNaN( criteriaValue.value ) ) {
		alert( "Please provide numeric value." );
		return false;
	}
	else if ( criteria.value == "ticketId" && criteriaValue.value.length < 7 ) {
		alert( "Please provide at least seven digit value." );
		return false;
	}
	else if ( criteria.value == "ticketId" && criteriaValue.value.length > 25 ) {
		alert( "Please provide maximum twenty five digit value." );
		return false;
	}
	else if ( ( criteria.value == "rmn" || criteria.value == "rtn" || criteria.value == "contactno" ) && criteriaValue.value.length > 10 ) {
		alert( "Please provide maximum ten digit value." );
		return false;
	}
	else if ( criteria.value == "customerId" && criteriaValue.value.length > 15 ) {
		alert( "Please provide maximum fifteen digit value." );
		return false;
	}
	else if ( ( criteria.value == "customername" || criteria.value == "cFName" || criteria.value == "cLName" ) && criteriaValue.value.length > 50 ) {
		alert( "Please provide maximum fifty characters value." );
		return false;
	}
	else if ( criteria.value == "leadid" && criteriaValue.value.length > 42 ) {
		alert( "Please provide maximum fourty two characters value." );
		return false;
	}
	else if ( criteria.value == "crfid" && criteriaValue.value.length > 25 ) {
		alert( "Please provide maximum twenty five characters value." );
		return false;
	}
	else {
		$( '.loadingPopup' ).removeClass( 'hide' );
		document.forms[ 0 ].action = "profileSearch.do?method=customerProfileSearch";
		document.forms[ 0 ].submit();
	}

}
function ValidatenReplaceAlphanumeric( txt ){
	var start = txt.selectionStart;
	if ( isNaN( txt.value ) ) {
		start -= 1;
	}
	txt.value = txt.value.replace( /[^0-9\n\r]+/g, '' );
	txt.selectionStart = start;
	txt.selectionEnd = start;
}
function changeToUpperCase( obj ){
	var start = obj.selectionStart;
	obj.value = obj.value.toUpperCase();
	obj.selectionStart = start;
	obj.selectionEnd = start;
}

function viewLead( inLmsId, inType, inboxId ){
	if ( null == inboxId || 0 == inboxId || undefined == inboxId ) {
		window.open( "leadGeneration.do?method=viewLeadDetails&lmsId=" + inLmsId + "&inType=" + inType, '_blank' );
	}
	else {
		window.open( "leadGeneration.do?method=viewLeadDetails&lmsId=" + inLmsId + "&inType=" + inType + "&InboxId=" + inboxId, '_blank' );
	}

}
function saveRemarks(){
	var valid = true;
	$( '#remarksLms ~ font' ).addClass( 'hidden' );
	if ( $( "#remarksLms" ).val().trim() == "" ) {
		$( '#remarksLms ~ font' ).removeClass( 'hidden' );
		$( '#remarksLms' ).next( 'font' ).show().html( "Please enter remarks" ).addClass( 'errorTextboxInDiv' );
		valid = false;
	}
	else if ( ( $( "#remarksLms" ).val().trim().length < 2 ) || ( ( $( "#remarksLms" ).val().trim().length > 4000 ) ) ) {
		$( '#remarksLms ~ font' ).removeClass( 'hidden' );
		$( '#remarksLms' ).next( 'font' ).show().html( "Please enter Remarks between [2-4000]." ).addClass( 'errorTextboxInDiv' );
		valid = false;
	}
	if ( valid ) {
		var answer = confirm( "Would you like to save the remarks ?" );
		if ( answer ) {
			document.forms[ 1 ].action = "leadGeneration.do?method=saveRemarks";
			document.forms[ 1 ].submit();
		}
	}
}
function removeZeroFromNumber( numberObj ){
	if ( numberObj.value == "0" ) {
		numberObj.value = "";
	}
}
function birthDateCheck( value, years ){
	if ( value == null ) {
		return false;
	}
	var currentYear = new Date().getFullYear();
	var selectedYear = value.split( '-' )[ 2 ];
	if ( ( currentYear - selectedYear ) > years ) {
		return true;
	}
	else {
		return false;
	}
}
function dateValidityChecker( value, noOfDays ){
	// Value must not be empty
	if ( value == null ) {
		return false;
	}
	var days = dateDiff( new Date(), getISODate( value ) );
	if ( days >= noOfDays ) {
		return true;
	}
	else {
		return false;
	}
}
function pastDateValidityChecker( value, noOfDays ){
	// Value must not be empty
	if ( value == null ) {
		return false;
	}
	var days = dateDiff( new Date(), getISODate( value ) );
	if ( days <= noOfDays ) {
		return true;
	}
	else {
		return false;
	}
}
function viewCRF( crfRecordId, inboxId, inType ){
	var url = "crmCap.do?method=viewCRFDetails&RecordId=" + crfRecordId + "&InboxId=" + inboxId + "&inType=" + inType;
	window.open( url, "_blank" );
	win.focus();
}
function dateDiff( startDate, endDate ){
	startDate.setHours( 0, 0, 0, 0 );
	endDate.setHours( 0, 0, 0, 0 );
	var one_day = 1000 * 60 * 60 * 24;
	return Math.floor( ( endDate.getTime() - startDate.getTime() ) / one_day );
}
function getISODate( date ){
	var months = [
			"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
	];
	date = date.split( '-' );
	var isoDate = new Date( date[ 2 ], months.indexOf( date[ 1 ] ), date[ 0 ] );
	return isoDate;
}
function validityChequeDate( value, noOfDays ){
	if ( value == null ) {
		return false;
	}
	var days = dateDiff( getISODate( value ), new Date() );
	if ( days < 0 || days > noOfDays ) {
		return false;
	}
	else {
		return true;
	}
}
function viewQRC( inTicketId, inBoolValue, inType, inboxId ){
	var url = "manageQrc.do?method=viewTicketPage&ticketId=" + inTicketId + "&boolValue=" + inBoolValue + "&inType=" + inType + "&inboxId=" + inboxId;
	window.open( url, "_blank" );
	win.focus();
}
function viewLMSTicket( inTicketId ){
	var url = "manageQrc.do?method=viewLMSTicket&ticketId=" + inTicketId;
	window.open( url, "_blank" );
	win.focus();
}

function widthChangeBR( val ){
	if ( val.length > 18 ) {
		$( '.dropdownWidthchange, .dropdownWidthchange select' ).addClass( 'width222' );
		$( '.dropdownWidthchange' ).addClass( 'width222Bg' );
	}
	else {
		$( '.dropdownWidthchange, .dropdownWidthchange select' ).removeClass( 'width222' );
		$( '.dropdownWidthchange' ).removeClass( 'width222Bg' );
	}
}
function validateIP( IP ){
	/* var IPregex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/; */
	var IPregex = /^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/;
	var res = IPregex.test( IP );
	return res;
}
function validatePincode( value, index ){
	var row = index;
	if ( !validatePin( value ) ) {
		var pin = "pincode" + row;
		$( "#" + pin ).next( 'font' ).show().html( "Please provide  valid PinCode" );
		return false;
	}
}

function ValidatenReplaceAlphanumericnDot( txt ){
	var start = txt.selectionStart;
	if ( isNaN( txt.value ) ) {
		start -= 1;
	}
	txt.value = txt.value.replace( /[^0-9.\n\r]+/g, '' );
	txt.selectionStart = start;
	txt.selectionEnd = start;
}

function autoFormatMacID( evt, element ){
	var charCode = ( evt.which ) ? evt.which : evt.keyCode;
	if ( charCode != 8 && charCode != 46 ) {
		if ( element.value.length == 4 || element.value.length == 9 ) {
			element.value = element.value + ".";
		}
	}
}

function iframeLoaded( iFrameID ){
	if ( iFrameID ) {
		// iFrameID.height = "";
		if ( iFrameID.contentWindow.document.body.scrollHeight == 0 || iFrameID.contentWindow.document.body.scrollHeight > 473 ) {
			iFrameID.height = "473px";
		}
		// else {
		// iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight + "px";
		// }
	}
}

function replaceOtherThanAlphaSpace( id ){
	if ( id != undefined && id != null ) {
		var str = $( '#' + id ).val();
		var start = str.selectionStart;
		if ( isNaN( str.value ) ) {
			start -= 1;
		}
		str = str.replace( /[^a-zA-Z ]+/g, '' );
		str.selectionStart = start;
		str.selectionEnd = start;
		$( '#' + id ).val( str );
	}
}

// $( window ).load( function(){
// $( 'a' ).keydown( function( evt ){
// var keyCode = evt.which || evt.keyCode;
// if ( keyCode == 13 ) {
// evt.preventDefault();
// }
// } );
// } );

function getSecondaryMACAddr( primaryId ){
	var customerId = $( '#telcomCustomer' ).val();
	var partnerId = $( '#partnerId' ).val();
	crmDwr.getSecondaryMacAdd( partnerId, customerId, function( list ){
		if ( list != null ) {
			if ( list[ 0 ] == "Error" ) {
				$( '#secondaryMacTextId' ).next( 'font' ).hide();
				$( '#currentSlaveMacId' ).next( 'font' ).show().html( list[ 0 ] + list[ 1 ] ).addClass( 'errorTextbox' );
			}
			else {
				$( '#secondaryMacTextId' ).autocomplete( {
					source : list, minLength : 0, change : function( e, ui ){
						if ( !ui.item ) {
							$( e.target ).val( '' );
						}
						else {
							$( '#currentSlaveMacId' ).val( ui.item.value );
						}
					}, select : function( e, ui ){
						e.preventDefault();
						$( e.target ).val( ui.item.label );
						fillDataPrimaryMacAddr( ui.item.value, primaryId );
					}, focus : function( e, ui ){
						return false;
					}
				} );
			}
		}
	} );
}
