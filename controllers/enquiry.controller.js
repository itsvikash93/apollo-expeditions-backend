const { sendEmail } = require("../config/mailgun");
const tripEnquiryModel = require("../models/trip-enquiry.model");
const packageEnquiryModel = require("../models/package-enquiry.model");
const contactUsModel = require("../models/contactus.model");

module.exports.addTripEnquiry = async (req, res) => {
  try {
    const tripEnquiry = await tripEnquiryModel.create(req.body);
    if (tripEnquiry) {
      const emailHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
    
    <div style="text-align: center; background: #007bff; padding: 15px; border-radius: 10px 10px 0 0;">
        <h2 style="color: #ffffff; margin: 0;">New Trip Enquiry</h2>
    </div>
    
    <div style="background: #fff; padding: 20px; border-radius: 0 0 10px 10px;">
      <p style="font-size: 16px; color: #333;"><strong>Name:</strong> ${tripEnquiry.name}</p>
      <p style="font-size: 16px; color: #333;"><strong>Email:</strong> ${tripEnquiry.email}</p>
      <p style="font-size: 16px; color: #333;"><strong>Phone:</strong> ${tripEnquiry.phone}</p>
      <p style="font-size: 16px; color: #333;"><strong>Message:</strong> ${tripEnquiry.message}</p>
      <p style="font-size: 16px; color: #333;"><strong>Trip Title:</strong> ${tripEnquiry.title}</p>
      <p style="font-size: 16px; color: #333;"><strong>Trip Location:</strong> ${tripEnquiry.location}</p>
      <p style="font-size: 16px; color: #333;"><strong>Enquiry Date:</strong> ${tripEnquiry.date}</p>
    </div>
    
    <div style="text-align: center; font-size: 12px; color: #666; margin-top: 20px;">
      <p>This is an automated email from your travel enquiry system</p>
    </div>
  </div>
`;

      const response = await sendEmail(
        `New Trip Enquiry from ${tripEnquiry.name}`,
        emailHtml
      );
      if (response.error) {
        res.status(500).json({ message: response.error });
      }
    }
    res.status(200).json({ message: "Enquiry sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addPackageEnquiry = async (req, res) => {
  try {
    const packageEnquiry = await packageEnquiryModel.create(req.body);
    if (packageEnquiry) {
      const emailHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
    
    <div style="text-align: center; background: #007bff; padding: 15px; border-radius: 10px 10px 0 0;">
      <h2 style="color: #ffffff; margin: 0;">New Package Enquiry</h2>
    </div>
    
    <div style="background: #fff; padding: 20px; border-radius: 0 0 10px 10px;">
      <p style="font-size: 16px; color: #333;"><strong>Name:</strong> ${packageEnquiry.name}</p>
      <p style="font-size: 16px; color: #333;"><strong>Email:</strong> ${packageEnquiry.email}</p>
      <p style="font-size: 16px; color: #333;"><strong>Phone:</strong> ${packageEnquiry.phone}</p>
      <p style="font-size: 16px; color: #333;"><strong>Message:</strong> ${packageEnquiry.message}</p>
      <p style="font-size: 16px; color: #333;"><strong>Package Title:</strong> ${packageEnquiry.title}</p>
      <p style="font-size: 16px; color: #333;"><strong>Package Location:</strong> ${packageEnquiry.location}</p>
      <p style="font-size: 16px; color: #333;"><strong>Enquiry Date:</strong> ${packageEnquiry.date}</p>
    </div>
    
    <div style="text-align: center; font-size: 12px; color: #666; margin-top: 20px;">
      <p>This is an automated email from your travel enquiry system</p>
    </div>
  </div>
`;

      const response = await sendEmail(
        `New Package Enquiry from ${packageEnquiry.name}`,
        emailHtml
      );
      if (response.error) {
        res.status(500).json({
          message: response.error,
        });
      }
    }
    res.status(200).json({ message: "Enquiry sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addContact = async (req, res) => {
  try {
    const contactUs = await contactUsModel.create(req.body);
    if (contactUs) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
          <h2 style="text-align: center; background: #007bff; padding: 15px; border-radius: 10px 10px 0 0;">New Contact Us Enquiry</h2>
           <div style="background: #fff; padding: 20px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; color: #333;"><strong>Name:</strong> ${contactUs.name}</p>
              <p style="font-size: 16px; color: #333;"><strong>Email:</strong> ${contactUs.email}</p>
              <p style="font-size: 16px; color: #333;"><strong>Phone:</strong> ${contactUs.phone}</p>
              <p style="font-size: 16px; color: #333;"><strong>Message:</strong> ${contactUs.message}</p>
            </div>
        </div>
      `;

      const response = await sendEmail(
        `New Contact Us Enquiry from ${contactUs.name}`,
        emailHtml
      );
      if (response.error) {
        res.status(500).json({ message: response.error });
      }
    }
    res.status(200).json({ message: "Enquiry sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
