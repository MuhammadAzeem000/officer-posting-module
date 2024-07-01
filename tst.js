// Global arrays
const officer = [
    {
        Id: 628,
        Department_Id: null,
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
        Department_Id: null,
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
];

const department = [
    {
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
        Department_Name: 'Information Science & Technology Department',
        Main_Position: 'Secretary',
        isVancany: true,
        Occupied_By: '',
        Officer: []
    }
];

// Function to add an officer to a department
function fnAddOfficerToDepartment(officerId, departmentId) {
    const selectedOfficer = officer.find(o => o.Id === officerId);
    const selectedDepartment = department.find(d => d.Id === departmentId);

    if (selectedOfficer && selectedDepartment) {
        // Add officer to department
        selectedDepartment.Officer.push(selectedOfficer);

        // Update officer's department Id
        selectedOfficer.Department_Id = departmentId;
    } else {
        console.error('Officer or Department not found.');
    }

    // Perform any additional updates or checks as needed
    updateGlobalState();
}

// Function to update additional charge for an officer
function fnUpdateAdditionalCharge(officerId, additionalChargeData) {
    const selectedOfficer = officer.find(o => o.Id === officerId);

    if (selectedOfficer) {
        // Update additional charge for officer
        selectedOfficer.Additional_Charge.push(additionalChargeData);
    } else {
        console.error('Officer not found.');
    }

    // Perform any additional updates or checks as needed
    updateGlobalState();
}

// Function to check for duplicate officers in a department
function fnHasDuplicateOfficers(departmentId) {
    const selectedDepartment = department.find(d => d.Id === departmentId);

    if (selectedDepartment) {
        const officerSet = new Set();
        for (const officer of selectedDepartment.Officer) {
            if (officerSet.has(officer.Id)) {
                return true; // Duplicate officer found
            }
            officerSet.add(officer.Id);
        }
    }

    return false; // No duplicates found
}

// Function to remove duplicate officers from departments
function fnRemoveDuplicateOfficers(departmentId) {
    const selectedDepartment = department.find(d => d.Id === departmentId);

    if (selectedDepartment) {
        const officerSet = new Set();
        selectedDepartment.Officer = selectedDepartment.Officer.filter(o => {
            if (officerSet.has(o.Id)) {
                return false; // Remove duplicate officer
            }
            officerSet.add(o.Id);
            return true;
        });
    }

    updateGlobalState();
}

// Example function to update global state in your application
function updateGlobalState() {
    // Example: Update UI, trigger state updates, etc.
    // You can update your UI based on the updated officer and department arrays
    // Ensure this function reflects any state changes across your application
    console.log('Global state updated:', officer, department);
}

// Example usage:
// Add an officer to a department
addOfficerToDepartment(628, 1);

// Update additional charge for an officer
updateAdditionalCharge(628, { Department_Id: 1, Id: 1, Department_Name: 'Agriculture Department', Main_Position: 'Secretary', isCancel: true });

// Check for duplicates in a department
const hasDuplicates = fnHasDuplicateOfficers(1);
console.log('Duplicates in department 1:', hasDuplicates);

// Remove duplicates from a department
fnRemoveDuplicateOfficers(1);
