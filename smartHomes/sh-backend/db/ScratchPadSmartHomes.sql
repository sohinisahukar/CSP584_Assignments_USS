USE smarthomes;

-- Products Table
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255),
    retailer_discount DECIMAL(10, 2) DEFAULT 0.00, 
    manufacturer_rebate DECIMAL(10, 2) DEFAULT 0.00,
    image_path VARCHAR(255) NOT NULL
);


INSERT INTO products (name, description, price, category, retailer_discount, manufacturer_rebate, image_path)
VALUES 
('Philips Hue', 'Smart LED light with adjustable brightness and color', 29.99, 'Lightbulbs', 0.00, 0.00, '/images/light1.jpg'),
('GE Lighting', 'Smart Wi-Fi LED light bulb with color control', 19.99, 'Lightbulbs', 0.00, 0.00, '/images/light2.jpg');

INSERT INTO products (name, description, price, category, retailer_discount, manufacturer_rebate, image_path)
VALUES 
('Smart Door Lock', 'High-security smart door lock with keyless entry', 199.99, 'Smart Door Locks', 0.00, 0.00, '/images/lock1.jpg'),
('Smart Thermostat', 'Energy-saving smart thermostat with Wi-Fi control', 129.99, 'Smart Thermostats', 0.00, 0.00, '/images/th1.jpg'),
('Smart Doorbell', 'Smart video doorbell with motion detection and alerts', 149.99, 'Smart Doorbells', 0.00, 0.00, '/images/bell1.jpg'),
('Smart Speaker', 'Voice-controlled smart speaker with music streaming', 89.99, 'Smart Speakers', 0.00, 0.00, '/images/sp1.jpg');

INSERT INTO products (name, description, price, category, retailer_discount, manufacturer_rebate, image_path)
VALUES 
('Wyze Bulb', 'Smart LED bulb with adjustable white light and app control', 14.99, 'Lightbulbs', 0.00, 0.00, '/images/light3.jpg'),
('Sengled Smart Bulb', 'Wi-Fi enabled LED bulb with voice assistant compatibility', 22.99, 'Lightbulbs', 0.00, 0.00, '/images/light4.jpg'),
('TP-Link Kasa Smart Bulb', 'Dimmable multicolor smart bulb with Wi-Fi control', 25.99, 'Lightbulbs', 0.00, 0.00, '/images/light5.jpg'),
('Nanoleaf Essentials', 'Energy-efficient smart bulb with rich colors and smart assistant support', 18.99, 'Lightbulbs', 0.00, 0.00, '/images/light6.jpg');

SET SQL_SAFE_UPDATES = 0;

delete from products where name like 'Smart Speaker';

SET SQL_SAFE_UPDATES = 1;

INSERT INTO products (name, description, price, category, retailer_discount, manufacturer_rebate, image_path)
VALUES 
('August Smart Lock', 'Keyless entry smart lock with Wi-Fi and voice assistant control', 249.99, 'Doorlocks', 0.00, 0.00, '/images/lock2.jpg'),
('Schlage Encode', 'Smart Wi-Fi deadbolt with built-in alarm technology', 199.99, 'Doorlocks', 0.00, 0.00, '/images/lock3.jpg'),
('Yale Assure Lock', 'Smart touchscreen deadbolt with Z-Wave and app control', 179.99, 'Doorlocks', 0.00, 0.00, '/images/lock4.jpg'),
('Ultraloq U-Bolt Pro', 'Keyless entry smart lock with fingerprint and Bluetooth control', 159.99, 'Doorlocks', 0.00, 0.00, '/images/lock5.jpg'),
('Eufy Security Smart Lock', 'Bluetooth-enabled smart lock with biometric fingerprint sensor', 169.99, 'Doorlocks', 0.00, 0.00, '/images/lock6.jpg'),
('Kwikset Halo', 'Smart Wi-Fi enabled deadbolt with app and voice assistant control', 189.99, 'Doorlocks', 0.00, 0.00, '/images/lock7.jpg');

INSERT INTO products (name, description, price, category, retailer_discount, manufacturer_rebate, image_path)
VALUES 
('Nest Learning Thermostat', 'Smart thermostat with energy-saving features and auto-scheduling', 249.99, 'Thermostats', 0.00, 0.00, '/images/th2.jpg'),
('Ecobee SmartThermostat', 'Thermostat with built-in Alexa and room sensor for enhanced comfort', 229.99, 'Thermostats', 0.00, 0.00, '/images/th3.jpg'),
('Honeywell Home T9', 'Smart thermostat with Wi-Fi and smart room sensors for precise control', 199.99, 'Thermostats', 0.00, 0.00, '/images/th4.jpg'),
('Sensi Touch Smart Thermostat', 'Touchscreen smart thermostat with easy setup and smart home compatibility', 169.99, 'Thermostats', 0.00, 0.00, '/images/th5.jpg'),
('Lux Kono Smart Thermostat', 'Stylish smart thermostat with interchangeable faceplates and app control', 139.99, 'Thermostats', 0.00, 0.00, '/images/th6.jpg'),
('Mysa Smart Thermostat', 'Wi-Fi enabled thermostat for electric baseboard heating, with energy-saving modes', 149.99, 'Thermostats', 0.00, 0.00, '/images/th7.jpg');

INSERT INTO products (name, description, price, category, retailer_discount, manufacturer_rebate, image_path)
VALUES 
('Ring Video Doorbell Pro 2', 'Smart video doorbell with 1536p HD video, 3D motion detection, and Alexa compatibility', 249.99, 'Doorbells', 0.00, 0.00, '/images/bell2.jpg'),
('Nest Hello Video Doorbell', 'HD video doorbell with 24/7 streaming and intelligent alerts', 229.99, 'Doorbells', 0.00, 0.00, '/images/bell3.jpg'),
('Arlo Essential Video Doorbell', 'Wireless video doorbell with HD video, motion detection, and direct-to-mobile calls', 179.99, 'Doorbells', 0.00, 0.00, '/images/bell4.jpg'),
('Eufy Security Video Doorbell', 'Battery-powered video doorbell with 2K HD video and human detection technology', 169.99, 'Doorbells', 0.00, 0.00, '/images/bell5.jpg'),
('Amcrest Video Doorbell Pro', 'Smart doorbell with 1080p video, night vision, and two-way audio', 149.99, 'Doorbells', 0.00, 0.00, '/images/bell6.jpg'),
('SimpliSafe Doorbell', '1080p HD video doorbell with motion alerts and night vision', 139.99, 'Doorbells', 0.00, 0.00, '/images/bell7.jpg');

INSERT INTO products (name, description, price, category, retailer_discount, manufacturer_rebate, image_path)
VALUES 
('Amazon Echo (4th Gen)', 'Smart speaker with premium sound, Alexa voice assistant, and smart home hub', 99.99, 'Speakers', 0.00, 0.00, '/images/sp2.jpg'),
('Google Nest Audio', 'Smart speaker with Google Assistant, rich sound, and seamless smart home integration', 89.99, 'Speakers', 0.00, 0.00, '/images/sp3.jpg'),
('Apple HomePod Mini', 'Compact smart speaker with Siri, room-filling sound, and smart home controls', 99.99, 'Speakers', 0.00, 0.00, '/images/sp4.jpg'),
('Sonos One (Gen 2)', 'Smart speaker with built-in Alexa and Google Assistant, excellent sound quality', 199.99, 'Speakers', 0.00, 0.00, '/images/sp5.jpg'),
('Bose Home Speaker 500', 'Premium smart speaker with voice control, Alexa and Google Assistant built-in, and stereo sound', 299.99, 'Speakers', 0.00, 0.00, '/images/sp6.jpg'),
('Harman Kardon Citation One', 'Elegant smart speaker with Google Assistant and rich sound', 149.99, 'Speakers', 0.00, 0.00, '/images/sp7.jpg');

select * from products;

CREATE TABLE accessories (
  accessory_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(255),
  image_path VARCHAR(255) NOT NULL
);

INSERT INTO accessories (name, description, price, category, image_path)
VALUES 
('Philips Hue Dimmer Switch', 'Wireless dimmer switch for controlling Philips Hue lights', 24.99, 'Lightbulbs', '/images/lcc1.jpg'),
('Smart Bulb Socket Adapter', 'Socket adapter to make standard bulbs smart with voice control', 14.99, 'Lightbulbs', '/images/lacc2.jpg'),
('Lutron Smart Bridge', 'Smart bridge to control multiple smart bulbs through an app or voice assistant', 99.99, 'Lightbulbs', '/images/lacc3.jpg');

INSERT INTO accessories (name, description, price, category, image_path)
VALUES 
('August Connect Wi-Fi Bridge', 'Bridge that allows remote access to August Smart Lock', 79.99, 'Doorlocks', '/images/dlcc1.jpg'),
('Yale Smart Keypad', 'Smart keypad for keyless entry with Yale smart locks', 59.99, 'Doorlocks', '/images/dlcc2.jpg'),
('Schlage Encode Wi-Fi Adapter', 'Adapter to enable remote control of Schlage Encode locks', 49.99, 'Doorlocks', '/images/dlcc2.jpg');

INSERT INTO accessories (name, description, price, category, image_path)
VALUES 
('Nest Temperature Sensor', 'Remote temperature sensor for Nest thermostats', 39.99, 'Thermostats', '/images/thacc1.jpg'),
('Ecobee SmartSensor', 'Smart room sensor for better temperature control with Ecobee thermostats', 79.99, 'Thermostats', '/images/thacc2.jpg'),
('Honeywell Home Wall Plate', 'Wall plate to cover large areas when installing Honeywell thermostats', 19.99, 'Thermostats', '/images/thacc3.jpg');

INSERT INTO accessories (name, description, price, category, image_path)
VALUES 
('Ring Chime', 'Plug-in chime that connects with Ring video doorbells to alert you of visitors', 29.99, 'Doorbells', '/images/dbacc1.jpg'),
('Nest Hello Wall Plate', 'Decorative wall plate for the Nest Hello video doorbell', 14.99, 'Doorbells', '/images/dbacc2.jpg'),
('Arlo Chime', 'Wireless chime that pairs with Arlo video doorbells to alert of visitors', 39.99, 'Doorbells', '/images/dbacc3.jpg');

INSERT INTO accessories (name, description, price, category, image_path)
VALUES 
('Amazon Echo Wall Mount', 'Wall mount bracket for Amazon Echo smart speakers', 19.99, 'Speakers', '/images/sacc1.jpg'),
('Google Nest Audio Stand', 'Protective stand for the Google Nest Audio speaker', 29.99, 'Speakers', '/images/sacc2.jpg'),
('Bose Speaker Remote', 'Remote control for Bose smart speakers', 49.99, 'Speakers', '/images/sacc3.jpg');


select * from accessories;

CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Customer', 'StoreManager', 'Salesman') DEFAULT 'Customer'
);

select * from user;

-- drop table users;

CREATE TABLE stores (
    storeId INT AUTO_INCREMENT PRIMARY KEY,
    storeName VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zipCode VARCHAR(10) NOT NULL
);

INSERT INTO stores (storeName, street, city, state, zipCode) VALUES
('SmartHomes Chicago', '123 W Randolph St', 'Chicago', 'IL', '60601'),
('SmartHomes New York', '456 Broadway', 'New York', 'NY', '10012'),
('SmartHomes San Francisco', '789 Market St', 'San Francisco', 'CA', '94103'),
('SmartHomes Dallas', '101 Main St', 'Dallas', 'TX', '75201'),
('SmartHomes Seattle', '202 Pike St', 'Seattle', 'WA', '98101'),
('SmartHomes Miami', '303 Ocean Dr', 'Miami', 'FL', '33139'),
('SmartHomes Boston', '404 Beacon St', 'Boston', 'MA', '02116'),
('SmartHomes Los Angeles', '505 Sunset Blvd', 'Los Angeles', 'CA', '90028'),
('SmartHomes Denver', '606 16th St', 'Denver', 'CO', '80202'),
('SmartHomes Atlanta', '707 Peachtree St', 'Atlanta', 'GA', '30308');



CREATE TABLE orders (
    orderId VARCHAR(36) PRIMARY KEY,
    userId INT NOT NULL,
    customerName VARCHAR(255) NOT NULL,
    customerAddress VARCHAR(255) NOT NULL,
    creditCard VARCHAR(16) NOT NULL,
    purchaseDate DATETIME NOT NULL,
    shipDate DATETIME NOT NULL,
    totalSales DECIMAL(10, 2) NOT NULL,
    storeId INT,
    FOREIGN KEY (storeId) REFERENCES stores(storeId),
    FOREIGN KEY (userId) REFERENCES user(user_id)
);

CREATE TABLE order_items (
    orderItemId INT AUTO_INCREMENT PRIMARY KEY,
    orderId VARCHAR(36),
    productId INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2),
    FOREIGN KEY (orderId) REFERENCES orders(orderId),
    FOREIGN KEY (productId) REFERENCES products(product_id)
);

CREATE TABLE customer_addresses (
  addressId INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  name VARCHAR(255),
  street VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  zipCode VARCHAR(20),
  FOREIGN KEY (userId) REFERENCES user(user_id) ON DELETE CASCADE
);


SELECT a.zipCode, COUNT(oi.productId) AS total_products_sold
FROM orders o
JOIN customer_addresses a ON o.addressId = a.addressId
JOIN order_items oi ON o.orderId = oi.orderId
GROUP BY a.zipCode
ORDER BY total_products_sold DESC
LIMIT 5;

SELECT p.name, SUM(oi.quantity) AS total_sold
FROM order_items oi
JOIN products p ON oi.productId = p.product_id
GROUP BY p.name
ORDER BY total_sold DESC
LIMIT 5;


