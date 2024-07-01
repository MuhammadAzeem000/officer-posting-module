const officer = [
    {
        Id: 628,
        Officer_Name: 'Zahid Ali Abbasi',
        Profile_ImgURL: 'assets/media/svg/avatars/009-boy-4.svg',
        Main_Position: 'Secretary',
        Department_Name: 'School Education & Literacy Department',
        isCancel: false,
        Additional_Charge: [],
        isPosted: true,
        isAwaiting: false,
        isAdditionalCharge: true,
        isDepartmentDrop: false,
    },
    {
        Id: 635,
        Officer_Name: 'Waseem Shamshad Ali',
        Profile_ImgURL: 'assets/media/svg/avatars/009-boy-4.svg',
        Main_Position: 'Secretary',
        Department_Name: 'Rehabilitation Department',
        isCancel: false,
        Additional_Charge: [],
        isPosted: true,
        isAwaiting: false,
        isAdditionalCharge: true,
        isDepartmentDrop: false,
    },
]

const department = [{
    Id: 1,
    Department_Name: 'Agriculture Department',
    Main_Position: 'Secretary',
    isVancany: true,
    Occupied_By: '',
    Officer: [],
},
{
    Id: 2,
    Department_Name: 'Irrigation Department',
    Main_Position: 'Secretary',
    isVancany: true,
    Occupied_By: '',
    Officer: []
},
{
    Id: 3,
    Department_Name: 'College Education Department',
    Main_Position: 'Secretary',
    isVancany: true,
    Occupied_By: '',
    Officer: []
},
{
    Id: 4,
    Department_Name: 'Finance Department',
    Main_Position: 'Secretary',
    isVancany: false,
    Occupied_By: '',
    Officer: []
},
{
    Id: 5,
    Department_Name: 'Information Sciecne & Technology Department',
    Main_Position: 'Secretary',
    isVancany: true,
    Occupied_By: '',
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

    const fnGetterAttribute = (name, element) => {
        const o = element.getAttribute(name);
        return JSON.parse(o);
    }

    const fnPositionLabel = (o) => {
        debugger;
        const { Department_Name, Main_Position, isCancel } = o;

        // Create label div
        const labelDiv = document.createElement('div');
        labelDiv.classList.add('label', 'label-xl', 'label-inline', 'label-light-success', 'mb-2', 'justify-content-between', 'h-auto', 'w-100');

        const titleDiv = document.createElement('div');

        // Create span for first part of label
        const span1 = document.createElement('span');
        span1.classList.add('mr-2');
        span1.textContent = `${Department_Name} |`;

        // Create span for second part of label
        const span2 = document.createElement('span');
        span2.classList.add('text-dark');
        span2.textContent = Main_Position;

        // Append spans to labelDiv
        titleDiv.appendChild(span1);
        titleDiv.appendChild(span2);

        labelDiv.append(titleDiv);

        if (isCancel === true) {
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-light-danger', 'btn-sm', 'ml-2');
            button.textContent = 'Cancel'
            button.addEventListener('click', fnCancelPosition);
            labelDiv.appendChild(button);
        }

        return labelDiv;
    }

    const fnCancelPosition = () => {
        alert("Would to like to cancel?");
        officer.forEach(o => {
            if (o.Id == currentOfficerData.Id) {
                const x = { Id: 1, Department_Name: currentDepartmentData.Department_Name, Main_Position: currentDepartmentData.Main_Position, isCancel: true }
                o.Additional_Charge.push(x);
                updatedOfficer = o;
            }
        })

        department.forEach(o => {
            if (o.Id == currentDepartmentData.Id) {
                o.Officer.push(updatedOfficer);
            }
        })
    }

    const fnOfficerCard = (o) => {
        const { Id, Officer_Name, Profile_ImgURL, isPosted, Main_Position, Department_Name, Additional_Charge } = o

        // Create main div element
        const mainDiv = document.createElement('div');
        mainDiv.setAttribute("draggable", "true");
        mainDiv.setAttribute('data-officer', JSON.stringify(o));
        mainDiv.setAttribute('data-id', Id);
        mainDiv.classList.add('d-flex', 'align-items-center', 'mb-5', 'officer-card', 'border', 'officer-card');

        // Create symbol div
        const symbolDiv = document.createElement('div');
        symbolDiv.classList.add('symbol', 'symbol-40', 'symbol-light-success', 'mr-5');

        // Create span inside symbol div
        const symbolSpan = document.createElement('span');
        symbolSpan.classList.add('symbol-label');

        // Create img inside span
        const img = document.createElement('img');
        img.setAttribute('src', 'assets/media/svg/avatars/009-boy-4.svg');
        img.classList.add('h-75', 'align-self-end');
        img.setAttribute('alt', '');

        // Append img to symbolSpan
        symbolSpan.appendChild(img);

        // Append symbolSpan to symbolDiv
        symbolDiv.appendChild(symbolSpan);

        // Append symbolDiv to mainDiv
        mainDiv.appendChild(symbolDiv);

        // Create flex column div
        const flexColumnDiv = document.createElement('div');
        flexColumnDiv.classList.add('d-flex', 'flex-column', 'flex-grow-1', 'font-weight-bold');

        // Create name div
        const nameDiv = document.createElement('div');
        nameDiv.classList.add('text-dark', 'text-hover-primary', 'mb-1', 'font-size-lg', 'font-weight-800');
        nameDiv.textContent = Officer_Name;

        //Create Parent Div
        const labelParentDiv = document.createElement('div')
        labelParentDiv.setAttribute('id', "PositionBadgesContainer");
        labelParentDiv.classList.add('w-100');

        // Create label div
        const labelDiv = fnPositionLabel(o);

        // Append nameDiv and labelDiv to flexColumnDiv
        flexColumnDiv.appendChild(nameDiv);
        labelParentDiv.appendChild(labelDiv);

        if (Additional_Charge.length > 0) {
            Additional_Charge.forEach(x => {
                labelParentDiv.appendChild(fnPositionLabel(x))
            });
        }

        flexColumnDiv.appendChild(labelParentDiv);

        // Append flexColumnDiv to mainDiv
        mainDiv.appendChild(flexColumnDiv);

        //DRAG FUNCTIONALITY
        mainDiv.addEventListener("dragstart", dragStart); //click on image to drag
        mainDiv.addEventListener("dragend", dragEnd);      //after you completed dragDrop

        return mainDiv;

    }

    const fnDepartmentCard = (o) => {
        const { Id, Department_Name, Main_Position, isVancany, Which_Vacany, Officer, Position, OB } = o;
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
        firstLine.classList.add('d-flex', 'align-items-center', 'justify-content-between', 'mb-2');

        const departmentLink = document.createElement('a');
        departmentLink.href = '#';
        departmentLink.classList.add('text-dark-75', 'text-hover-primary', 'font-weight-bold', 'font-size-lg', 'mb-1');
        departmentLink.textContent = Department_Name + " - " + Main_Position;

        const availabilitySpan = document.createElement('span');
        availabilitySpan.classList.add('label', 'label-xl', 'label-inline', `label-light-${isVancany ? 'danger' : 'success'}`);
        availabilitySpan.textContent = isVancany ? 'Available' : 'Not Available';

        firstLine.appendChild(departmentLink);
        firstLine.appendChild(availabilitySpan);

        // Create second line of text
        const secondLine = document.createElement('span');
        secondLine.classList.add('text-muted', 'font-weight-bold');
        // secondLine.textContent = `${Which_Vacany.length} Vacancy Available ${Which_Vacany.length > 0 ? `(${Position})` : ''}`;
        secondLine.textContent = OB;


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

    const fnRefreshUI = () => {
        OfficerContainer.innerHTML = "";
        DepartmentContainer.innerHTML = "";

        for (let r = 0; r < officer.length; r++) {
            const Officer_Card = fnOfficerCard(officer[r]);
            OfficerContainer.appendChild(Officer_Card);
        }

        for (let r = 0; r < department.length; r++) {
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

    function dragStart(event) {
        CurrentCard = this.cloneNode(true);
        currentOfficerData = fnGetterAttribute('data-officer', CurrentCard);
        CurrentCard.classList.add('dragging');
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function dragEnter(event) {
        event.preventDefault();
        CurrentDropZone = this;
        currentDepartmentData = fnGetterAttribute('data-department', CurrentDropZone);
        CurrentDropZone.classList.add('dragover');
    }

    function dragLeave() {
        CurrentDropZone.classList.remove('dragover');
    }

    function dragDrop() {
        CurrentDropZone.classList.remove('dragover');
        let updatedOfficer;

        officer.forEach((o, i) => {
            if (o.Id == currentOfficerData.Id) {
                const x = { Id: i, Department_Name: currentDepartmentData.Department_Name, Main_Position: currentDepartmentData.Main_Position, isCancel: true }
                o.Additional_Charge.push(x);
                updatedOfficer = o;
            }
        })

        department.forEach(o => {
            if (o.Id == currentDepartmentData.Id) {
                o.Officer.push(updatedOfficer);
            }
        })

        CurrentCard.setAttribute('data-officer', JSON.stringify(currentOfficerData));
        CurrentDropZone.setAttribute('data-department', JSON.stringify(currentDepartmentData));

        fnRefreshUI();
    }

    function dragEnd(event) {
        CurrentCard.classList.remove('dragging');
        CurrentCard = null;
        CurrentDropZone = null;
        currentOfficerData = null;
        currentDepartmentData = null;
    }

    fnRefreshUI();
}