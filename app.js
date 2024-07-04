const officer = [
    {
        Id: 1,
        Department_Id: 1,
        Officer_Name: 'Zahid Ali Abbasi ( PAS) BS-21',
        Profile_ImgURL: 'assets/media/svg/avatars/009-boy-4.svg',
        Main_Position: 'Secretary',
        Department_Name: 'School Education & Literacy Department',
        isCancel: true,
        Additional_Charge: [],
        isPosted: true,
    },
    {
        Id: 2,
        Department_Id: 2,
        Officer_Name: 'Waseem Shamshad Ali ( PAS) BS-21',
        Profile_ImgURL: 'assets/media/svg/avatars/009-boy-4.svg',
        Main_Position: 'Secretary',
        Department_Name: 'Rehabilitation Department',
        isCancel: true,
        Additional_Charge: [],
        isPosted: true,
    },
    {
        Id: 3,
        Department_Id: null,
        Officer_Name: 'Mr.Manzoor Ali Shaikh',
        Profile_ImgURL: 'assets/media/svg/avatars/009-boy-4.svg',
        Main_Position: 'Awaiting Posting',
        isCancel: false,
        Department_Name: 'Services, General Administration & Coordination Department',
        Additional_Charge: [],
        isPosted: false,
    },
]

const department = [{
    Id: 1,
    Department_Name: 'School Education & Literacy Department',
    Main_Position: 'Secretary',
    Officer: [
        {
            Id: 1,
            Department_Id: 1,
            Officer_Name: 'Zahid Ali Abbasi ( PAS) BS-21',
            Profile_ImgURL: 'assets/media/svg/avatars/009-boy-4.svg',
            Main_Position: 'Secretary',
            Department_Name: 'School Education & Literacy Department',
            isCancel: true,
            Additional_Charge: [],
            isPosted: true,
        },
    ],
},
{
    Id: 2,
    Department_Name: 'Rehabilitation Department',
    Main_Position: 'Secretary',
    Officer: [
        {
            Id: 2,
            Department_Id: 2,
            Officer_Name: 'Waseem Shamshad Ali ( PAS) BS-21',
            Profile_ImgURL: 'assets/media/svg/avatars/009-boy-4.svg',
            Main_Position: 'Secretary',
            Department_Name: 'Rehabilitation Department',
            isCancel: true,
            Additional_Charge: [],
            isPosted: true,
        },
    ]
},
{
    Id: 3,
    Department_Name: 'Irrigation Department',
    Main_Position: 'Secretary',
    Officer: []
}
]

window.onload = function () {
    const OfficerContainer = document.querySelector('#kt_officer');
    const DepartmentContainer = document.querySelector('#kt_department');

    let CurrentCard, CurrentDropZone, currentDepartmentData, currentOfficerData, Additional_Charge_Limit;

    Additional_Charge_Limit = 1;

    function fnShowModal(modalText, callback) {
        const modalDiv = document.querySelector('#ShowModal');
        const modalBody = modalDiv.querySelector('#ModalText');
        const ModalOKBtn = modalDiv.querySelector('#ModalOKBtn');
        const ModalCancelBtn = modalDiv.querySelector('#ModalCancelBtn');

        modalBody.textContent = modalText;

        ModalOKBtn.addEventListener('click', () => {
            callback();
            $(modalDiv).modal('hide');
        });

        ModalCancelBtn.addEventListener('click', () => {
            $(modalDiv).modal('hide');
        });

        $(modalDiv).modal('show');
    }

    function fnMultipleActionModal(modalText, mainBtnCallback, additionalBtnCallback) {
        const modalDiv = document.querySelector('#MultipleActionModal');
        const modalBody = modalDiv.querySelector('#MultipleActionModalText');
        const ModalMainBtn = modalDiv.querySelector('#MultipleActionModalMainBtn');
        const ModalAdditionalBtn = modalDiv.querySelector('#MultipleActionModalAdditionalBtn');
        const ModalCancelBtn = modalDiv.querySelector('#MultipleActionModalCancelBtn');

        modalBody.textContent = modalText;

        ModalMainBtn.addEventListener('click', () => {
            mainBtnCallback();
            $(modalDiv).modal('hide');
        });

        ModalAdditionalBtn.addEventListener('click', () => {
            additionalBtnCallback();
            $(modalDiv).modal('hide');
        });

        ModalCancelBtn.addEventListener('click', () => {
            $(modalDiv).modal('hide');
        });

        $(modalDiv).modal('show');
    }

    const fnGetterAttribute = (name, element) => {
        const o = element.getAttribute(name);
        return JSON.parse(o);
    }

    const fnPositionLabel = (o) => {
        const { Id, Department_Name, Main_Position, isCancel, isWhere } = o;

        // Create label div
        const labelDiv = document.createElement('div');
        labelDiv.setAttribute('data-id', Id);
        labelDiv.classList.add('label', 'label-xl', 'label-inline', `label-light-${isCancel ? 'success' : 'primary'}`, 'mb-2', 'justify-content-between', 'h-auto', 'w-100');

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
            button.addEventListener('click', () => {
                fnCancelPosition(o, Id, isWhere)
            });
            labelDiv.appendChild(button);
        }

        return labelDiv;
    }

    const fnCancelPosition = (x, Selected_Id, isWhere) => {
        let modalText, officerIndex, departmentToUpdateIndex, officerIndexInDepartment, additionalChargeIndex;

        if (isWhere === 'Main') {
            const { Id, Department_Id } = x

            // Find the index of the current officer in the officer array
            officerIndex = officer.findIndex(o => o.Id === Id);
            departmentToUpdateIndex = department.findIndex(o => o.Id === Department_Id);
            officerIndexInDepartment = department[departmentToUpdateIndex].Officer.findIndex(o => o.Id === Id);

            if (officerIndex === -1) {
                alert('Officer not found.');
                return;
            }

            if (departmentToUpdateIndex === -1) {
                alert('Department not found.');
                return;
            }

            if (officerIndexInDepartment === -1) {
                alert('Officer in department not found.');
                return;
            }

            modalText = `Do you want to remove the Main Charge of ${officer[officerIndex].Officer_Name}?`;

            fnShowModal(modalText, () => {
                debugger;
                //Replace main charge with awaited
                officer[officerIndex].Department_Name = 'Services, General Administration &Coordination Department'
                officer[officerIndex].Main_Position = 'Awaiting Posting'
                officer[officerIndex].isPosted = false
                officer[officerIndex].isCancel = false

                if (department[departmentToUpdateIndex].Officer[officerIndexInDepartment].Additional_Charge.length !== 0) {
                    // Remove main charge officer from department's Officer array if have additional charge
                    department[departmentToUpdateIndex].Officer[officerIndexInDepartment].Department_Name = 'Services, General Administration &Coordination Department'
                    department[departmentToUpdateIndex].Officer[officerIndexInDepartment].Main_Position = 'Awaiting Posting'
                    department[departmentToUpdateIndex].Officer[officerIndexInDepartment].isPosted = false
                    department[departmentToUpdateIndex].Officer[officerIndexInDepartment].isCancel = false
                } else {
                    // Remove officer from department's Officer array if have no additional charge
                    department[departmentToUpdateIndex].Officer.splice(officerIndexInDepartment, 1);
                }

                fnRefreshUI();
            });

            return;
        }

        if (isWhere === 'Additional') {
            const { Department_Id, Officer_Id } = x

            // Find the index of the current officer in the officer array
            officerIndex = officer.findIndex(o => o.Id === Officer_Id);
            departmentToUpdateIndex = department.findIndex(o => o.Id === Department_Id);
            officerIndexInDepartment = department[departmentToUpdateIndex].Officer.findIndex(o => o.Id === Officer_Id);
            additionalChargeIndex = officer[officerIndex].Additional_Charge.findIndex(c => c.Id === Selected_Id);

            // Remove the additional charge
            if (officerIndex === -1) {
                alert('Officer not found.');
                return;
            }

            if (departmentToUpdateIndex === -1) {
                alert('Department not found.');
                return;
            }

            if (officerIndexInDepartment === -1) {
                alert('Officer in department not found.');
                return;
            }

            if (additionalChargeIndex === -1) {
                alert('Officer additional charge not found.');
                return;
            }

            modalText = `Do you want to remove the Additional Charge of ${officer[officerIndex].Officer_Name}?`;

            fnShowModal(modalText, () => {
                officer[officerIndex].Additional_Charge.splice(additionalChargeIndex, 1);
                department[departmentToUpdateIndex].Officer[officerIndexInDepartment].Additional_Charge.splice(additionalChargeIndex, 1);
                department[departmentToUpdateIndex].Officer.splice(officerIndexInDepartment, 1)
                fnRefreshUI();
            });
            console.log("officer", officer);
            console.log("department", department);
            return;
        }

    }

    const fnOfficerCard = (o) => {
        const { Id, Officer_Name, Profile_ImgURL, Additional_Charge } = o

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
        img.setAttribute('src', Profile_ImgURL);
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
        const labelDiv = fnPositionLabel({ ...o, isWhere: 'Main' });

        // Append nameDiv and labelDiv to flexColumnDiv
        flexColumnDiv.appendChild(nameDiv);
        labelParentDiv.appendChild(labelDiv);

        if (Additional_Charge.length > 0) {
            Additional_Charge.forEach(x => {
                labelParentDiv.appendChild(fnPositionLabel({ ...x, isWhere: 'Additional' }))
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
        const { Id, Department_Name, Main_Position, Officer } = o;
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
        availabilitySpan.classList.add('label', 'label-xl', 'label-inline', `label-light-${Officer.length === 0 ? 'danger' : 'success'}`);
        availabilitySpan.textContent = Officer.length === 0 ? 'Available' : 'Not Available';

        firstLine.appendChild(departmentLink);
        firstLine.appendChild(availabilitySpan);
        textDiv.appendChild(firstLine);

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
            additionalDiv.appendChild(dropHereDiv);
        }


        // Append textDiv and additionalDiv to container
        textDiv.appendChild(additionalDiv);
        container.appendChild(textDiv);

        return container;

    }

    const fnRefreshUI = () => {
        OfficerContainer.innerHTML = "";
        DepartmentContainer.innerHTML = "";

        officer.forEach(o => {
            const Officer_Card = fnOfficerCard(o);
            OfficerContainer.appendChild(Officer_Card);
        });

        department.forEach(d => {
            const Department_Card = fnDepartmentCard(d);

            Department_Card.addEventListener('dragover', dragOver);
            Department_Card.addEventListener('dragenter', dragEnter);
            Department_Card.addEventListener('dragleave', dragLeave);
            Department_Card.addEventListener('drop', dragDrop);

            DepartmentContainer.appendChild(Department_Card);
        });
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

        let modalText, officerIndex, exisitingOfficerIndex, departmentToUpdateIndex, exisitingDepartmentIndex, officerIndexInDepartment, additionalChargeIndex;

        // Find the index of the current officer in the officer array
        officerIndex = officer.findIndex(o => o.Id === currentOfficerData.Id);
        if (officerIndex === -1) {
            alert('Officer not found.');
            return;
        }

        // Find the department in the department array to update
        departmentToUpdateIndex = department.findIndex(o => o.Id === currentDepartmentData.Id);
        if (departmentToUpdateIndex === -1) {
            alert('Department not found.');
            return;
        }

        //Officer[Posted] => Department[Vacant]
        if (officer[officerIndex].isPosted && department[departmentToUpdateIndex].Officer.length === 0) {
            modalText = `Do you  want to add ${officer[officerIndex].Officer_Name} Main charge or additional to the ${department[departmentToUpdateIndex].Department_Name}?`;

            exisitingDepartmentIndex = department.findIndex(o => o.Id === officer[officerIndex].Department_Id);
            if (exisitingDepartmentIndex === -1) {
                alert('Existing Department not found.');
                return;
            }

            officerIndexInDepartment = department[exisitingDepartmentIndex].Officer.findIndex(o => o.Id === officer[officerIndex].Id);
            if (officerIndexInDepartment === -1) {
                alert('Existing Officer not found.');
                return;
            }

            fnMultipleActionModal(modalText,
                () => {
                    department[exisitingDepartmentIndex].Officer.splice(officerIndexInDepartment, 1);

                    // Replace the original post object
                    officer[officerIndex].Department_Name = department[departmentToUpdateIndex].Department_Name
                    officer[officerIndex].Main_Position = department[departmentToUpdateIndex].Main_Position
                    officer[officerIndex].Department_Id = department[departmentToUpdateIndex].Id

                    if (department[departmentToUpdateIndex].Officer.length <= Additional_Charge_Limit) {
                        department[departmentToUpdateIndex].Officer.push(officer[officerIndex]);
                    }

                    fnRefreshUI();
                },
                () => {
                    // Create the Additional Charge object
                    const additionalCharge = {
                        Department_Id: department[departmentToUpdateIndex].Id,
                        Officer_Id: officer[officerIndex].Id,
                        Id: officer[officerIndex].Additional_Charge.length, // Assuming Id should be based on the length of Additional_Charge array
                        Department_Name: department[departmentToUpdateIndex].Department_Name,
                        Main_Position: department[departmentToUpdateIndex].Main_Position,
                        isCancel: true
                    };

                    // Update the officer's Additional_Charge array
                    if (officer[officerIndex].Additional_Charge.length <= Additional_Charge_Limit) {
                        officer[officerIndex].Additional_Charge.push(additionalCharge);
                        department.forEach(o => {
                            let exisitingOfficerIndex = o.Officer.findIndex(x => x.Id === officer[officerIndex].Id)
                            if (exisitingOfficerIndex !== 1) {
                                o.Officer[exisitingOfficerIndex] = officer[officerIndex]
                            }
                        });
                        department[departmentToUpdateIndex].Officer.push(officer[officerIndex]);
                    }

                    fnRefreshUI();
                });
            return;
        }

        //Officer[Posted] => Department[Occupied]
        if (officer[officerIndex].isPosted && department[departmentToUpdateIndex].Officer.length > 0) {
            modalText = `Do you want to replace ${department[departmentToUpdateIndex].Officer[0].Officer_Name}?`;

            fnShowModal(modalText, () => {
                modalText = `Do you  want to add ${officer[officerIndex].Officer_Name} Main charge to the ${department[departmentToUpdateIndex].Department_Name}?`;
                fnMultipleActionModal(modalText,
                    () => {
                        //find officers in department and remove it
                        department.forEach(o => {
                            exisitingOfficerIndex = o.Officer.findIndex(x => x.Department_Id === department[departmentToUpdateIndex].Id)

                            if (exisitingOfficerIndex !== -1) {
                                o.Officer.splice(exisitingOfficerIndex, 1)
                            }
                        });

                        // make awaiting post for exisiting officer
                        exisitingOfficerIndex = officer.findIndex(o => o.Department_Id === department[departmentToUpdateIndex].Id);
                        if (exisitingOfficerIndex !== -1) {
                            officer[exisitingOfficerIndex].Department_Name = 'Services, General Administration &Coordination Department';
                            officer[exisitingOfficerIndex].Main_Position = 'Awaiting Posting';
                            officer[exisitingOfficerIndex].isPosted = false;
                            officer[exisitingOfficerIndex].Department_Id = null;
                        }

                        // make main post for cuurent officer
                        officer[officerIndex].Department_Name = department[departmentToUpdateIndex].Department_Name
                        officer[officerIndex].Main_Position = department[departmentToUpdateIndex].Main_Position
                        officer[officerIndex].Department_Id = department[departmentToUpdateIndex].Id;

                        //add current officer to the following department
                        department[departmentToUpdateIndex].Officer.push(officer[officerIndex]);

                        fnRefreshUI();
                    },
                    () => {
                        // Create the Additional Charge object
                        const additionalCharge = {
                            Department_Id: department[departmentToUpdateIndex].Id,
                            Officer_Id: officer[officerIndex].Id,
                            Id: officer[officerIndex].Additional_Charge.length, // Assuming Id should be based on the length of Additional_Charge array
                            Department_Name: department[departmentToUpdateIndex].Department_Name,
                            Main_Position: department[departmentToUpdateIndex].Main_Position,
                            isCancel: true
                        };

                        // Update the officer's Additional_Charge array
                        officer[officerIndex].Additional_Charge.push(additionalCharge);
                        department[departmentToUpdateIndex].Officer.push(officer[officerIndex])

                        fnRefreshUI();
                    });
            });


            return;
        }

        //Officer[Awaited] => Department[Vacant]
        if (officer[officerIndex].isPosted === false && department[departmentToUpdateIndex].Officer.length === 0) {
            const modalText = `Do you  want to add ${officer[officerIndex].Officer_Name} Main charge to the ${department[departmentToUpdateIndex].Department_Name}?`;
            fnShowModal(modalText, () => {
                officer[officerIndex].Department_Name = department[departmentToUpdateIndex].Department_Name
                officer[officerIndex].Main_Position = department[departmentToUpdateIndex].Main_Position
                officer[officerIndex].Department_Id = department[departmentToUpdateIndex].Id;
                officer[officerIndex].isPosted = true;
                officer[officerIndex].isCancel = true;
                department[departmentToUpdateIndex].Officer = [officer[officerIndex]];

                fnRefreshUI();
            });

            return;
        }

        //Officer[Awaited] => Department[Occupied]
        if (officer[officerIndex].isPosted === false && department[departmentToUpdateIndex].Officer.length > 0) {
            let modalText = `Do you want to replace ${department[departmentToUpdateIndex].Officer[0].Officer_Name}?`;

            fnShowModal(modalText, () => {
                //exisiting officer
                exisitingOfficer = officer.find(off => off.Id == department[departmentToUpdateIndex].Officer[0].Id);
                exisitingOfficer.Department_Name = 'Services, General Administration &Coordination Department';
                exisitingOfficer.Main_Position = 'Awaiting Posting';
                exisitingOfficer.isPosted = false;

                // Replace the original post object
                officer[officerIndex].Department_Name = department[departmentToUpdateIndex].Department_Name
                officer[officerIndex].Main_Position = department[departmentToUpdateIndex].Main_Position
                officer[officerIndex].isPosted = true;
                department[departmentToUpdateIndex].Officer = [officer[officerIndex]];

                fnRefreshUI();
            });

            return;
        }
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