function solve() {
	let str = document.getElementById('input').value;

	let sum = [...str].reduce((acc, curr) => acc += +curr, 0);

	while(sum > 9){
		sum = [...sum.toString()].reduce((acc, curr) => acc += +curr, 0)
	}

	//let operatingStr = str.slice(sum).slice(0, str.length - sum * 2);
	let operatingStr = str.slice(0, str.length - sum).slice(sum);

	let matches = operatingStr.match(/[01]{1,8}/g);

	let rawResult = matches.map(v => parseInt(v, 2)).map(n => String.fromCharCode(n)).join("");

	let result = rawResult.match(/[\w\s]/g).join("");

	document.getElementById('resultOutput').textContent = result;
}