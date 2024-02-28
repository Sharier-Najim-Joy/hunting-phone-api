const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones, isShowAll)
}

const displayPhone = (phones = 13, isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    // clear phoneContainer cards before adding new card
    phoneContainer.textContent = ''

    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }

    // display only first 12 phone if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        console.log(phone);
        const phonesDiv = document.createElement('div');
        phonesDiv.classList = 'card bg-base-100 shadow-xl '
        phonesDiv.innerHTML = `
                    <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">SHOW DETAILS</button>
                      </div>
                    </div>       
        `
        phoneContainer.appendChild(phonesDiv)
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}

const handleShowDetails = async (id) => {
    console.log('show', id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data
    showPhoneDetails(phone)
    // console.log(data);
}

const showPhoneDetails = (phone) => {
    // show the modal
    show_details_modal.showModal()
    console.log(phone);
    const showPhoneContainer = document.getElementById('show_phone_container');
    showPhoneContainer.innerHTML = `
    <img src="${phone?.image}" alt="">
    <p>${phone?.name}</p>
    <p>${phone?.releaseDate}</p>
    <p>${phone?.mainFeatures?.displaySize}</p>
    <p><span>ChipSet:</span>${phone.mainFeatures.chipSet}</p>
    <p>${phone?.mainFeatures?.memory}</p>
    <p>${phone?.mainFeatures?.storage}</p>
    <p>${phone?.others?.GPS || 'no gps'}</p>
    `
}

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    // searchFiled.value=''
    console.log(searchText);
    loadPhone(searchText, isShowAll)
}

// const handleSearch2 =()=>{
//     toggleLoadingSpinner(true)
//     const searchFiled2 = document.getElementById('search-filed2');
//     const searchFiled2Text=searchFiled2.value;
//     searchFiled2.value=''
//     console.log(searchFiled2Text);
//     loadPhone(searchFiled2Text)
// }
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}
// handle show all
const handleShowAll = () => {
    handleSearch(true);
}
loadPhone()