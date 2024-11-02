const amountInput = document.getElementById('amountInput');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');

const apiKey = 'YOUR_API_KEY'; // Replace with your API key
const apiURL = 'https://open.er-api.com/v6/latest';

async function fetchCurrencies() {
    const response = await fetch(`${apiURL}/USD`);
    const data = await response.json();
    const currencies = Object.keys(data.rates);

    currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        const optionTo = document.createElement('option');

        optionFrom.value = currency;
        optionTo.value = currency;

        optionFrom.textContent = currency;
        optionTo.textContent = currency;

        fromCurrency.appendChild(optionFrom);
        toCurrency.appendChild(optionTo);
    });
}

async function convertCurrency() {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!amount || isNaN(amount)) {
        result.textContent = 'Please enter a valid amount';
        return;
    }

    const response = await fetch(`${apiURL}/${from}`);
    const data = await response.json();
    const rate = data.rates[to];

    if (rate) {
        const convertedAmount = (amount * rate).toFixed(2);
        result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    } else {
        result.textContent = 'Conversion failed';
    }
}

fetchCurrencies();

convertBtn.addEventListener('click', convertCurrency);
