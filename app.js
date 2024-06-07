import inquirer from 'inquirer';
import axios from 'axios';

const apiUrl = 'http://localhost:5001/api';

async function viewAllProducts() {
    try {
        const response = await axios.get(`${apiUrl}/products`);
        console.log('Products:', response.data);
    } catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message);
    }
    await mainMenu(); // Return to main menu after viewing
}

async function viewAllCategories() {
    try {
        const response = await axios.get(`${apiUrl}/categories`);
        console.log('Categories:', response.data);
    } catch (error) {
        console.error('Error fetching categories:', error.response?.data || error.message);
    }
    await mainMenu(); // Return to main menu after viewing
}

async function createProduct() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'name', message: 'Product Name:' },
        { type: 'input', name: 'description', message: 'Product Description:' },
        { type: 'input', name: 'price', message: 'Product Price:' },
        { type: 'input', name: 'stock', message: 'Product Stock:' },
        { type: 'input', name: 'sku', message: 'Product SKU:' },
        { type: 'input', name: 'categoryId', message: 'Product Category ID:' }
    ]);

    try {
        const response = await axios.post(`${apiUrl}/products`, answers);
        console.log('Product created:', response.data);
    } catch (error) {
        console.error('Error creating product:', error.response?.data || error.message);
    }
    await mainMenu(); // Return to main menu after creating
}

async function createCategory() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'name', message: 'Category Name:' }
    ]);

    try {
        const response = await axios.post(`${apiUrl}/categories`, { name: answers.name });
        console.log('Category created:', response.data);
    } catch (error) {
        console.error('Error creating category:', error.response?.data || error.message);
    }
    await mainMenu(); // Return to main menu after creating
}

async function updateProduct() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'Product ID to update:' },
        { type: 'input', name: 'name', message: 'Product Name:' },
        { type: 'input', name: 'description', message: 'Product Description:' },
        { type: 'input', name: 'price', message: 'Product Price:' },
        { type: 'input', name: 'stock', message: 'Product Stock:' },
        { type: 'input', name: 'sku', message: 'Product SKU:' },
        { type: 'input', name: 'categoryId', message: 'Product Category ID:' }
    ]);

    try {
        const response = await axios.put(`${apiUrl}/products/${answers.id}`, answers);
        console.log('Product updated:', response.data);
    } catch (error) {
        console.error('Error updating product:', error.response?.data || error.message);
    }
    await mainMenu(); // Return to main menu after updating
}

async function deleteProduct() {
    const { id } = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'Product ID to delete:' }
    ]);

    try {
        await axios.delete(`${apiUrl}/products/${id}`);
        console.log('Product deleted');
    } catch (error) {
        console.error('Error deleting product:', error.response?.data || error.message);
    }
    await mainMenu(); // Return to main menu after deleting
}

async function viewAllUsers() {
    try {
        const response = await axios.get(`${apiUrl}/users`);
        console.log('Users:', response.data);
    } catch (error) {
        console.error('Error fetching users:', error.response?.data || error.message);
    }
    await mainMenu(); // Return to main menu after viewing
}

async function createUser() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'username', message: 'Username:' },
        { type: 'input', name: 'password', message: 'Password:' },
        { type: 'input', name: 'role', message: 'Role:' }
    ]);

    try {
        const response = await axios.post(`${apiUrl}/register`, answers);
        console.log('User created:', response.data);
    } catch (error) {
        console.error('Error creating user:', error.response?.data || error.message);
    }
    await mainMenu(); // Return to main menu after creating
}

async function updateUser() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'User ID to update:' },
        { type: 'input', name: 'username', message: 'Username:' },
        { type: 'input', name: 'password', message: 'Password:' },
        { type: 'input', name: 'role', message: 'Role:' }
    ]);

    try {
        const response = await axios.put(`${apiUrl}/users/${answers.id}`, answers);
        console.log('User updated:', response.data);
    } catch (error) {
        console.error('Error updating user:', error.response?.data || error.message);
    }
    await mainMenu(); // Return to main menu after updating
}

async function deleteUser() {
    const { id } = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'User ID to delete:' }
    ]);

    try {
        await axios.delete(`${apiUrl}/users/${id}`);
        console.log('User deleted');
    } catch (error) {
        console.error('Error deleting user:', error.response?.data || error.message);
    }
    await mainMenu(); // Return to main menu after deleting
}

async function viewAllOrderItems() {
    try {
        const response = await axios.get(`${apiUrl}/order-items`);
        console.log('Order Items:', response.data);
    } catch (error) {
        console.error('Error fetching order items:', error.response?.data || error.message);
    }
    await mainMenu(); // Return to main menu after viewing
}

async function createOrderItem() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'orderId', message: 'Order ID:' },
        { type: 'input', name: 'productId', message: 'Product ID:' },
        { type: 'input', name: 'quantity', message: 'Quantity:' },
        { type: 'input', name: 'price', message: 'Price:' }
    ]);

    try {
        const response = await axios.post(`${apiUrl}/order-items`, answers);
        console.log('Order item created:', response.data);
    } catch (error) {
        console.error('Error creating order item:', error.response?.data || error.message);
    }
    await mainMenu(); // Return to main menu after creating
}

async function updateOrderItem() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'Order Item ID to update:' },
        { type: 'input', name: 'orderId', message: 'Order ID:' },
        { type: 'input', name: 'productId', message: 'Product ID:' },
        { type: 'input', name: 'quantity', message: 'Quantity:' },
        { type: 'input', name: 'price', message: 'Price:' }
    ]);

    try {
        const response = await axios.put(`${apiUrl}/order-items/${answers.id}`, answers);
        console.log('Order item updated:', response.data);
    } catch (error) {
        console.error('Error updating order item:', error.response?.data || error.message);
    }
    await mainMenu(); // Return to main menu after updating
}

async function deleteOrderItem() {
    const { id } = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'Order Item ID to delete:' }
    ]);

    try {
        await axios.delete(`${apiUrl}/order-items/${id}`);
        console.log('Order item deleted');
    } catch (error) {
        console.error('Error deleting order item:', error.response?.data || error.message);
    }
    await mainMenu(); // Return to main menu after deleting
}

async function viewAllStockMovements() {
    try {
        const response = await axios.get(`${apiUrl}/stock-movements`);
        console.log('Stock Movements:', response.data);
    } catch (error) {
        console.error('Error fetching stock movements:', error.response?.data || error.message);
    }
    await mainMenu(); // Return to main menu after viewing
}

async function createStockMovement() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'productId', message: 'Product ID:' },
        { type: 'input', name: 'quantity', message: 'Quantity:' },
        { type: 'input', name: 'type', message: 'Type (restock/sale):' }
    ]);

    try {
        const response = await axios.post(`${apiUrl}/stock-movements`, answers);
        console.log('Stock movement created:', response.data);
    } catch (error) {
        console.error('Error creating stock movement:', error.response?.data || error.message);
    }
    await mainMenu(); // Return to main menu after creating
}

async function updateStockMovement() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'Stock Movement ID to update:' },
        { type: 'input', name: 'productId', message: 'Product ID:' },
        { type: 'input', name: 'quantity', message: 'Quantity:' },
        { type: 'input', name: 'type', message: 'Type (restock/sale):' }
    ]);

    try {
        const response = await axios.put(`${apiUrl}/stock-movements/${answers.id}`, answers);
        console.log('Stock movement updated:', response.data);
    } catch (error) {
        console.error('Error updating stock movement:', error.response?.data || error.message);
    }
    await mainMenu(); // Return to main menu after updating
}

async function deleteStockMovement() {
    const { id } = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'Stock Movement ID to delete:' }
    ]);

    try {
        await axios.delete(`${apiUrl}/stock-movements/${id}`);
        console.log('Stock movement deleted');
    } catch (error) {
        console.error('Error deleting stock movement:', error.response?.data || error.message);
    }
    await mainMenu(); // Return to main menu after deleting
}

async function handleProducts() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Products Menu:',
            choices: [
                'View All Products',
                'Create Product',
                'Update Product',
                'Delete Product',
                'Back to Main Menu'
            ]
        }
    ]);

    switch (answers.option) {
        case 'View All Products':
            await viewAllProducts();
            break;
        case 'Create Product':
            await createProduct();
            break;
        case 'Update Product':
            await updateProduct();
            break;
        case 'Delete Product':
            await deleteProduct();
            break;
        case 'Back to Main Menu':
            await mainMenu();
            break;
    }
}

async function handleCategories() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Categories Menu:',
            choices: [
                'View All Categories',
                'Create Category',
                'Back to Main Menu'
            ]
        }
    ]);

    switch (answers.option) {
        case 'View All Categories':
            await viewAllCategories();
            break;
        case 'Create Category':
            await createCategory();
            break;
        case 'Back to Main Menu':
            await mainMenu();
            break;
    }
}

async function handleUsers() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Users Menu:',
            choices: [
                'View All Users',
                'Create User',
                'Update User',
                'Delete User',
                'Back to Main Menu'
            ]
        }
    ]);

    switch (answers.option) {
        case 'View All Users':
            await viewAllUsers();
            break;
        case 'Create User':
            await createUser();
            break;
        case 'Update User':
            await updateUser();
            break;
        case 'Delete User':
            await deleteUser();
            break;
        case 'Back to Main Menu':
            await mainMenu();
            break;
    }
}

async function handleOrderItems() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Order Items Menu:',
            choices: [
                'View All Order Items',
                'Create Order Item',
                'Update Order Item',
                'Delete Order Item',
                'Back to Main Menu'
            ]
        }
    ]);

    switch (answers.option) {
        case 'View All Order Items':
            await viewAllOrderItems();
            break;
        case 'Create Order Item':
            await createOrderItem();
            break;
        case 'Update Order Item':
            await updateOrderItem();
            break;
        case 'Delete Order Item':
            await deleteOrderItem();
            break;
        case 'Back to Main Menu':
            await mainMenu();
            break;
    }
}

async function handleStockMovements() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Stock Movements Menu:',
            choices: [
                'View All Stock Movements',
                'Create Stock Movement',
                'Update Stock Movement',
                'Delete Stock Movement',
                'Back to Main Menu'
            ]
        }
    ]);

    switch (answers.option) {
        case 'View All Stock Movements':
            await viewAllStockMovements();
            break;
        case 'Create Stock Movement':
            await createStockMovement();
            break;
        case 'Update Stock Movement':
            await updateStockMovement();
            break;
        case 'Delete Stock Movement':
            await deleteStockMovement();
            break;
        case 'Back to Main Menu':
            await mainMenu();
            break;
    }
}

async function mainMenu() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Please choose an option:',
            choices: [
                'Products',
                'Categories',
                'Users',
                'Order Items',
                'Stock Movements',
                'Exit'
            ]
        }
    ]);

    switch (answers.option) {
        case 'Products':
            await handleProducts();
            break;
        case 'Categories':
            await handleCategories();
            break;
        case 'Users':
            await handleUsers();
            break;
        case 'Order Items':
            await handleOrderItems();
            break;
        case 'Stock Movements':
            await handleStockMovements();
            break;
        case 'Exit':
            console.log('Exiting...');
            process.exit();
    }
}

mainMenu();
