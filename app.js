const officer = [{
    Id: 1,
    Officer_Name: 'Officer 001',
    Profile_ImgURL: 'assets/media/svg/avatars/009-boy-4.svg',
    Main_Postion: 'Postion 01',
    Additional_Charge: ['Additional_Charge 01'],
    isPosted: true,
    isAwaiting: false,
    isAdditionalCharge: true,
    isDepartmentDrop: false,
},
{
    Id: 2,
    Officer_Name: 'Officer 002',
    Profile_ImgURL: 'assets/media/svg/avatars/009-boy-4.svg',
    Main_Postion: '',
    Additional_Charge: [],
    isPosted: false,
    isAwaiting: true,
    isAdditionalCharge: false,
    isDepartmentDrop: false,
}]

const department = [{
    Id: 1,
    Department_Name: 'Department 001',
    isVancany: true,
    Which_Vacany: ['Additional_Charge 01'],
    Officer: []
},
{
    Id: 2,
    Department_Name: 'Department 002',
    isVancany: true,
    Which_Vacany: ['Additional_Charge 01'],
    Officer: []
}
]

window.onload = function () {
    debugger;
    const OfficerContainer = document.querySelector('#kt_officer');
    const DepartmentContainer = document.querySelector('#kt_department');

    $('#no-vacancy-ok-btn').click(() => {
        $('#no-vacancy').modal('hide')
    })

    let CurrentCard, CurrentDropZone, currentDepartmentData, currentOfficerData;

    const fnOfficerCard = (o) => {
        const { Id, Officer_Name, Profile_ImgURL, isPosted, Main_Postion, Additional_Charge } = o

        // Create parent container
        const container = document.createElement('div');
        container.setAttribute("draggable", "true");
        container.setAttribute('data-officer', JSON.stringify(o));
        container.setAttribute('data-id', Id);
        container.classList.add('d-flex', 'align-items-center', 'mb-5', 'officer-card');

        // Create symbol div
        const symbolDiv = document.createElement('div');
        symbolDiv.classList.add('symbol', 'symbol-40', 'symbol-light-success', 'mr-5');

        // Create symbol label (img)
        const symbolLabel = document.createElement('span');
        symbolLabel.classList.add('symbol-label');

        const img = document.createElement('img');
        img.src = Profile_ImgURL;
        img.classList.add('h-75', 'align-self-end');
        img.alt = '';

        symbolLabel.appendChild(img);
        symbolDiv.appendChild(symbolLabel);

        // Append symbolDiv to container
        container.appendChild(symbolDiv);

        // Create text section
        const textDiv = document.createElement('div');
        textDiv.classList.add('d-flex', 'flex-column', 'flex-grow-1', 'font-weight-bold');

        // Create first line of text
        const firstLine = document.createElement('div');
        firstLine.classList.add('d-flex', 'align-items-center', 'justify-content-between');

        const officerName = document.createElement('span');
        officerName.innerHTML = `<span class="text-dark text-hover-primary mb-1 font-size-lg">${Officer_Name}</span><span class="text-muted ml-2">${Main_Postion}</span>`;

        const postedLabel = document.createElement('span');
        postedLabel.classList.add('label', 'label-xl', 'label-inline', `${isPosted ? 'label-light-success' : 'label-light-danger'}`);

        postedLabel.textContent = isPosted ? 'Posted' : 'Awaiting Posting';

        firstLine.appendChild(officerName);
        firstLine.appendChild(postedLabel);

        // Create second line of text
        const secondLine = document.createElement('span');

        const additionChargeLabel = document.createElement('span');
        additionChargeLabel.classList.add('label', 'label-md', 'label-inline', 'label-light-success', 'mr-2');
        additionChargeLabel.textContent = 'Addition Charge:';

        const sectionOfficers = document.createElement('span');
        sectionOfficers.classList.add('text-muted');
        sectionOfficers.textContent = Additional_Charge.join(', ');

        secondLine.appendChild(additionChargeLabel);
        secondLine.appendChild(sectionOfficers);

        // Append firstLine and secondLine to textDiv
        textDiv.appendChild(firstLine);
        textDiv.appendChild(secondLine);

        // Append textDiv to container
        container.appendChild(textDiv);

        return container;
    }

    const fnDepartmentCard = (o) => {
        const { Id, Department_Name, isVancany, Which_Vacany, Officer } = o;
        // Create parent container
        const container = document.createElement('div');
        container.setAttribute('data-id', Id);
        container.setAttribute('data-department', JSON.stringify(o));
        container.classList.add('d-flex', 'align-items-center', 'mb-5', 'department-card');

        // Create bullet span
        const bulletSpan = document.createElement('span');
        bulletSpan.classList.add('bullet', 'bullet-bar', 'bg-success', 'align-self-stretch');

        // Append bulletSpan to container
        container.appendChild(bulletSpan);

        // Create text section
        const textDiv = document.createElement('div');
        textDiv.classList.add('d-flex', 'flex-column', 'flex-grow-1', 'ml-4');

        // Create first line of text
        const firstLine = document.createElement('div');
        firstLine.classList.add('d-flex', 'align-items-center', 'justify-content-between');

        const departmentLink = document.createElement('a');
        departmentLink.href = '#';
        departmentLink.classList.add('text-dark-75', 'text-hover-primary', 'font-weight-bold', 'font-size-lg', 'mb-1');
        departmentLink.textContent = Department_Name;

        const availabilitySpan = document.createElement('span');
        availabilitySpan.classList.add('label', 'label-xl', 'label-inline', `label-light-${isVancany ? 'danger' : 'success'}`);
        availabilitySpan.textContent = isVancany ? 'Available' : 'Not Available';

        firstLine.appendChild(departmentLink);
        firstLine.appendChild(availabilitySpan);

        // Create second line of text
        const secondLine = document.createElement('span');
        secondLine.classList.add('text-muted', 'font-weight-bold');
        secondLine.textContent = `${Which_Vacany.length} Vacancy Available`;

        // Append firstLine and secondLine to textDiv
        textDiv.appendChild(firstLine);
        textDiv.appendChild(secondLine);

        // Create additional div with id="kt_card_drop"
        const additionalDiv = document.createElement('div');
        additionalDiv.id = 'kt_card_drop';

        if (Officer.length > 0) {
            Officer.forEach(a => {
                additionalDiv.appendChild(fnOfficerCard(a))
            });
        } else {
            const dropHereDiv = document.createElement('div');
            dropHereDiv.classList.add('label', 'label-xl', 'label-inline', 'w-100', 'mt-2', 'label-light-success');
            dropHereDiv.textContent = 'Drop Here';

            isVancany && additionalDiv.appendChild(dropHereDiv);
        }


        // Append textDiv and additionalDiv to container
        textDiv.appendChild(additionalDiv);
        container.appendChild(textDiv);

        return container;

    }

    function dragStart(event) {
        CurrentCard = this;
        CurrentCard.classList.add('dragging');

    }

    function dragOver(event) {
        event.preventDefault();
    }

    function dragEnter(event) {
        event.preventDefault();
        CurrentDropZone = this;
        CurrentDropZone.classList.add('dragover');
    }

    function dragLeave() {
        CurrentDropZone.classList.remove('dragover');
    }

    function dragDrop() {
        CurrentDropZone.classList.remove('dragover');

        currentDepartmentData = department.find(o => {
            return CurrentDropZone.dataset.id == o.Id;
        });

        currentOfficerData = officer.find(o => {
            return CurrentCard.dataset.id == o.Id;
        });

        const a = CurrentDropZone.getAttribute('data-department');
        const departmentObj = JSON.parse(a);

        // if (departmentObj.isVancany === false) {
        //     $('#no-vacancy').modal('show');
        //     return;
        // }

        const x = CurrentCard.getAttribute('data-officer');
        const officerObj = JSON.parse(x);

        if (officerObj.isDepartmentDrop === false) {
            const Drop_Zone = CurrentDropZone.querySelector('#kt_card_drop');
            Drop_Zone.appendChild(CurrentCard);
            officerObj.isDepartmentDrop = true;
        } else {
            OfficerContainer.append(CurrentCard);
            officerObj.isDepartmentDrop = false;
        }

        CurrentCard.setAttribute('data-officer', JSON.stringify(officerObj));
    }

    function dragEnd(event) {
        CurrentCard.classList.remove('dragging');
        CurrentCard = null;
        CurrentDropZone = null;
    }

    OfficerContainer.innerHTML = "";
    DepartmentContainer.innerHTML = "";

    for (let r = 0; r < officer.length; r++) {
        // Now append the entire container to a parent element in your actual HTML document
        // For example, assuming you have a parent container with id "itemsContainer":
        const Officer_Card = fnOfficerCard(officer[r]);

        //DRAG FUNCTIONALITY
        Officer_Card.addEventListener("dragstart", dragStart); //click on image to drag
        Officer_Card.addEventListener("dragend", dragEnd);      //after you completed dragDrop

        OfficerContainer.appendChild(Officer_Card);
    }

    for (let r = 0; r < department.length; r++) {
        // Now append the entire container to a parent element in your actual HTML document
        // For example, assuming you have a parent container with id "itemsContainer":
        const Department_Card = fnDepartmentCard(department[r]);

        Department_Card.addEventListener('dragover', dragOver);
        Department_Card.addEventListener('dragenter', dragEnter);
        Department_Card.addEventListener('dragleave', dragLeave);
        Department_Card.addEventListener('drop', dragDrop);

        OfficerContainer.addEventListener('dragover', dragOver);
        OfficerContainer.addEventListener('dragenter', dragEnter);
        OfficerContainer.addEventListener('dragleave', dragLeave);
        OfficerContainer.addEventListener('drop', dragDrop);


        DepartmentContainer.appendChild(Department_Card);
    }
}