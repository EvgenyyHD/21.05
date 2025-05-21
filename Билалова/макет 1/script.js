document.addEventListener('DOMContentLoaded', function() {
  const repairTypeRadios = document.querySelectorAll('input[name="repairType"]');
  const propertyTypeRadios = document.querySelectorAll('input[name="propertyType"]');
  const roomsRadios = document.querySelectorAll('input[name="rooms"]');
  const areaInput = document.getElementById('area');
  const areaValue = document.getElementById('areaValue');
  const repairTimeEl = document.getElementById('repairTime');
  const discountEl = document.getElementById('discount');
  const repairPrices = {
    cosmetic: 3000,
    turnkey: 6000,
    capital: 4500,
    designer: 8000
  };
  const repairTimes = {
    cosmetic: 20,
    turnkey: 45,
    capital: 30,
    designer: 60
  };
  const propertyCoefficients = {
    new: 1.0,
    secondary: 1.2
  };
  const roomCoefficients = {
    1: 1.0,
    2: 1.1,
    3: 1.2,
    4: 1.3
  };
  function calculateDiscount(area) {
    if (area < 30) return 0;
    if (area < 50) return 5;
    if (area < 80) return 7;
    if (area < 120) return 10;
    return 15;
  }
  function calculateValues() {
    const repairType = document.querySelector('input[name="repairType"]:checked').value;
    const propertyType = document.querySelector('input[name="propertyType"]:checked').value;
    const rooms = document.querySelector('input[name="rooms"]:checked').value;
    const area = parseInt(areaInput.value);
    const baseTime = repairTimes[repairType];
    const roomFactor = roomCoefficients[rooms];
    const time = Math.round(baseTime * (area / 50) * roomFactor);
    
    const basePrice = repairPrices[repairType];
    const propertyFactor = propertyCoefficients[propertyType];
    const totalPrice = basePrice * area * propertyFactor * roomFactor;
    const discountPercent = calculateDiscount(area);
    const discountAmount = Math.round(totalPrice * discountPercent / 100);
    repairTimeEl.textContent = `до ${time} дней`;
    discountEl.textContent = `${discountAmount.toLocaleString('ru-RU')} руб`;
  }
  areaInput.addEventListener('input', function() {
    areaValue.textContent = this.value;
    calculateValues();
  });
  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', calculateValues);
  });
  calculateValues();
});