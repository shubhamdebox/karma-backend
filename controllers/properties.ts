import { Request, Response } from "express";
import axios from "axios";
import HouseModel from "../models/house";
let cron = require("node-cron");



//route 1:- active under controll
export const loadPropertiesActiveUnderContract = async (
  req: Request,
  res: Response
) => {
  try {
    async function reload(skip: string) {
      const response = await axios.get("https://api.mlsgrid.com/v2/Property", {
        params: {
          $filter:
            "OriginatingSystemName eq 'carolina' and MlgCanView eq true and StandardStatus eq 'Active Under Contract'",
          $expand: "Media,Rooms",

          $skip: skip,
        },
        headers: {
          "Accept-Encoding": "gzip,deflate",
          Authorization: process.env.MLS_Token,
        },
      });

      let commonData = response.data;

      // filtering data from api and stored in karmaData
      let karmaData = commonData.value.map((house: any) => {
        return {
          appliances: house.Appliances,
          associationFee: house.AssociationFee,
          associationName: house.AssociationName,
          availabilityDate: house.AvailabilityDate,
          bathroomsFull: house.BathroomsFull,
          bathroomsHalf: house.BathroomsHalf,
          bathroomsTotalInteger: house.BathroomsTotalInteger,
          bedroomsTotal: house.BedroomsTotal,
          sqFtBasement: house.BelowGradeFinishedArea,
          buildingAreaTotal: house.BuildingAreaTotal,
          buyerAgencyCompensation: house.BuyerAgencyCompensation,
          sellingAgentMLSBoard: house.BuyerAgentAOR,
          sellingAgentFullName: house.BuyerAgentFullName,
          sellingOfficeName: house.BuyerOfficeName,
          sellingOfficePhone: house.BuyerOfficePhone,
          additionalInformation: house.CAR_AdditionalInformation,
          auctionBidInformation: house.CAR_AuctionBidInformation,
          auctionBidType: house.CAR_AuctionBidType,
          auctionYn: house.CAR_AuctionYN,
          ceilingHeight: house.CAR_CeilingHeight,
          price: house.ListPrice,
          constructionStatus: house.CAR_ConstructionStatus,
          constructionType: house.CAR_ConstructionType,
          coSellingTeamMUI: house.CAR_CoSellingTeam_MUI,
          coSellingTeamMLSID: house.CAR_CoSellingTeamMLSID,
          coSellingTeamName: house.CAR_CoSellingTeamName,
          financingInformation: house.CAR_FinancingInformation,
          hoaSubjectToDues: house.CAR_HOASubjectToDues,
          garageBays: house.CAR_NumberOfBays,
          officeSqFt: house.CAR_OfficeSqFt,
          porch: house.CAR_Porch,
          potentialIncome: house.CAR_PotentialIncome,
          sqFtGarage: house.CAR_SqFtGarage,
          sqFtTotal: house.CAR_TotalPrimaryHLA,
          coSellingAgentMLSBoard: house.CoBuyerAgentAOR,
          coSellingAgentPrimaryBoard: house.CoBuyerAgentAOR,
          coSellingAgentFullName: house.CoBuyerAgentFullName,
          coSellingAgentMUI: house.CoBuyerAgentKey,
          coSellingAgentMLSID: house.CoBuyerAgentMlsId,
          coSellingAgentDirectWorkPhone: house.CoBuyerAgentOfficePhone,
          coSellingOfficeMUI: house.CoBuyerOfficeKey,
          coSellingOfficeMLSID: house.CoBuyerOfficeMlsId,
          coSellingOfficeName: house.CoBuyerOfficeName,
          coSellingOfficePhone: house.CoBuyerOfficePhone,
          coListAgentMLSBoard: house.CoListAgentAOR,
          coListAgentPrimaryBoard: house.CoListAgentAOR,
          coListAgentFullName: house.CoListAgentFullName,
          coListAgentMUI: house.CoListAgentKey,
          coListAgentMLSID: house.CoListAgentMlsId,
          coListAgentDirectWorkPhone: house.CoListAgentPreferredPhone,
          coListOfficeMUI: house.coListOfficeKey,
          coListOfficeMLSID: house.CoListOfficeMlsId,
          coListOfficeName: house.CoListOfficeName,
          communityFeatures: house.CommunityFeatures,
          sellerContribution: house.ConcessionsAmount,
          countyOrParish: house.CountyOrParish,
          cumulativeDaysOnMarket: house.CumulativeDaysOnMarket,
          daysOnMarket: house.DaysOnMarket,
          elementarySchool: house.ElementarySchool,
          highSchool: house.HighSchool,
          latitude: house.Latitude,
          listingAgentMLSBoard: house.ListAgentAOR,
          listingAgentPrimaryBoard: house.ListAgentAOR,
          listAgentDirectWorkPhone: house.ListAgentDirectPhone,
          listAgentFullName: house.ListAgentFullName,
          listAgentMUI: house.ListAgentKey,
          listAgentMLSID: house.ListAgentMlsId,
          listingType: house.ListingAgreement,
          listingContractDate: house.ListingContractDate,
          listingId: house.ListingId,
          listPrice: house.ListPrice,
          longitude: house.Longitude,
          lastChangeTimestamp: house.MajorChangeTimestamp,
          middleOrJuniorSchool: house.MiddleOrJuniorSchool,
          newConstructionYN: house.NewConstructionYN,
          modificationTimestamp: house.OriginatingSystemModificationTimestamp,
          parking: house.ParkingFeatures,
          parkingTotal: house.ParkingTotal,
          propertySubType: house.PropertySubType,
          propertyType: house.PropertyType,
          publicRemarks: house.PublicRemarks,
          streetName: house.StreetName,
          streetNumber: house.StreetNumber,
          subdivisionName: house.SubdivisionName,
          waterSource: house.WaterSource,
          yearBuilt: house.YearBuilt,
          description: house.LongDescription,
          accessibilityFeatures: house.AccessibilityFeatures,
          builderName: house.BuilderName,
          numberOfCompletedUnitsTota: house.CAR_NumberOfCompletedUnitsTotal,
          numberOfDocksTotal: house.CAR_NumberOfDocksTotal,
          numberOfDriveInDoorsTotal: house.CAR_NumberOfDriveInDoorsTotal,
          numberOfProjectedUnitsTotal: house.CAR_NumberOfProjectedUnitsTotal,
          sqFtMain: house.CAR_SqFtMain,
          sqFtMaximumLease: house.CAR_SqFtMaximumLease,
          sqFtMinimumLease: house.CAR_SqFtMinimumLease,
          sqFtThird: house.CAR_SqFtThird,
          sqFtUpper: house.CAR_SqFtUpper,
          streetViewParam: house.CAR_StreetViewParam,
          city: house.City,
          directions: house.Directions,
          fireplaceYN: house.FireplaceYN,
          furnished: house.Furnished,
          laundryFeatures: house.LaundryFeatures,
          livingArea: house.LivingArea,
          originalListPrice: house.OriginalListPrice,
          postalCode: house.PostalCode,
          taxAssessedValue: house.TaxAssessedValue,
          virtualTourURLUnbranded: house.VirtualTourURLUnbranded,
          exteriorFeatures: house.ExteriorFeatures,
          lotSizeArea: house.LotSizeArea,
          lotSizeUnits: house.LotSizeUnits,
          standardStatus: house.StandardStatus,
          masterBedroomLevel:
            house.Rooms?.find(
              (room: any) =>
                room.CAR_RoomTypes &&
                room.CAR_RoomTypes.includes("Primary Bedroom")
            )?.
              RoomLevel || "",
          media: house.Media
            ? house.Media.map((el: any) => ({
              longDescription: el.LongDescription,
              mediaKey: el.MediaKey,
              order: el.Order,
              mediaURL: el.MediaURL,
            }))
            : [],
          rooms: house.Rooms
            ? house.Rooms.map((el: any) => ({
              bathsFull: el.CAR_BathsFull,
              bathsHalf: el.CAR_BathsHalf,
              bedsTotal: el.CAR_BedsTotal,
              roomKey: el.RoomKey,
              roomLevel: el.RoomLevel,
              roomTypes: el.CAR_RoomTypes,
            }))
            : [],
        };
      });

      //  console.log(house.Rooms.find(room => room.RoomTypes && room.RoomTypes.includes("Primary Bedroom"))?.RoomLevel)

      //creating karma-data and store in database
      HouseModel.create(karmaData);

      // console.log(karmaData.garageBays)
      let nextData = commonData["@odata.nextLink"];

      if (typeof nextData === "undefined") {
        console.log("done");
        res.status(200).json({ success: true });
        return;
      }

      let value = nextData.substring(nextData.lastIndexOf("=") + 1);

      console.log(value);

      if (nextData) {
        reload(value);
      } else {
        res.status(200).json({ success: false });
      }
    }

    await reload("0");
    // console.log("here we get the value",value)
  } catch (error: any) {
    console.log(
      "Error in loadPropertiesActiveUnderContract : ",
      error.toString()
    );
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
    return;
  }
};

//route 2:- is active
export const loadPropertiesActive = async (req: Request, res: Response) => {
  try {
    async function reload(skip: string) {
      const response = await axios.get("https://api.mlsgrid.com/v2/Property", {
        params: {
          $filter:
            "OriginatingSystemName eq 'carolina' and MlgCanView eq true and StandardStatus eq 'Active'",
          $expand: "Media,Rooms",

          $skip: skip,
        },
        headers: {
          "Accept-Encoding": "gzip,deflate",
          Authorization: process.env.MLS_TOKEN,
        },
      });

      let commonData = response.data;

      // filtering data from api and stored in karmaData
      let karmaData = commonData.value.map((house: any) => {
        return {
          appliances: house.Appliances,
          associationFee: house.AssociationFee,
          associationName: house.AssociationName,
          availabilityDate: house.AvailabilityDate,
          bathroomsFull: house.BathroomsFull,
          bathroomsHalf: house.BathroomsHalf,
          bathroomsTotalInteger: house.BathroomsTotalInteger,
          bedroomsTotal: house.BedroomsTotal,
          sqFtBasement: house.BelowGradeFinishedArea,
          buildingAreaTotal: house.BuildingAreaTotal,
          buyerAgencyCompensation: house.BuyerAgencyCompensation,
          sellingAgentMLSBoard: house.BuyerAgentAOR,
          sellingAgentFullName: house.BuyerAgentFullName,
          sellingOfficeName: house.BuyerOfficeName,
          sellingOfficePhone: house.BuyerOfficePhone,
          additionalInformation: house.CAR_AdditionalInformation,
          auctionBidInformation: house.CAR_AuctionBidInformation,
          auctionBidType: house.CAR_AuctionBidType,
          auctionYn: house.CAR_AuctionYN,
          ceilingHeight: house.CAR_CeilingHeight,
          price: house.ListPrice,
          constructionStatus: house.CAR_ConstructionStatus,
          constructionType: house.CAR_ConstructionType,
          coSellingTeamMUI: house.CAR_CoSellingTeam_MUI,
          coSellingTeamMLSID: house.CAR_CoSellingTeamMLSID,
          coSellingTeamName: house.CAR_CoSellingTeamName,
          financingInformation: house.CAR_FinancingInformation,
          hoaSubjectToDues: house.CAR_HOASubjectToDues,
          garageBays: house.CAR_NumberOfBays,
          officeSqFt: house.CAR_OfficeSqFt,
          porch: house.CAR_Porch,
          potentialIncome: house.CAR_PotentialIncome,
          sqFtGarage: house.CAR_SqFtGarage,
          sqFtTotal: house.CAR_TotalPrimaryHLA,
          coSellingAgentMLSBoard: house.CoBuyerAgentAOR,
          coSellingAgentPrimaryBoard: house.CoBuyerAgentAOR,
          coSellingAgentFullName: house.CoBuyerAgentFullName,
          coSellingAgentMUI: house.CoBuyerAgentKey,
          coSellingAgentMLSID: house.CoBuyerAgentMlsId,
          coSellingAgentDirectWorkPhone: house.CoBuyerAgentOfficePhone,
          coSellingOfficeMUI: house.CoBuyerOfficeKey,
          coSellingOfficeMLSID: house.CoBuyerOfficeMlsId,
          coSellingOfficeName: house.CoBuyerOfficeName,
          coSellingOfficePhone: house.CoBuyerOfficePhone,
          coListAgentMLSBoard: house.CoListAgentAOR,
          coListAgentPrimaryBoard: house.CoListAgentAOR,
          coListAgentFullName: house.CoListAgentFullName,
          coListAgentMUI: house.CoListAgentKey,
          coListAgentMLSID: house.CoListAgentMlsId,
          coListAgentDirectWorkPhone: house.CoListAgentPreferredPhone,
          coListOfficeMUI: house.coListOfficeKey,
          coListOfficeMLSID: house.CoListOfficeMlsId,
          coListOfficeName: house.CoListOfficeName,
          communityFeatures: house.CommunityFeatures,
          sellerContribution: house.ConcessionsAmount,
          countyOrParish: house.CountyOrParish,
          cumulativeDaysOnMarket: house.CumulativeDaysOnMarket,
          daysOnMarket: house.DaysOnMarket,
          elementarySchool: house.ElementarySchool,
          highSchool: house.HighSchool,
          latitude: house.Latitude,
          listingAgentMLSBoard: house.ListAgentAOR,
          listingAgentPrimaryBoard: house.ListAgentAOR,
          listAgentDirectWorkPhone: house.ListAgentDirectPhone,
          listAgentFullName: house.ListAgentFullName,
          listAgentMUI: house.ListAgentKey,
          listAgentMLSID: house.ListAgentMlsId,
          listingType: house.ListingAgreement,
          listingContractDate: house.ListingContractDate,
          listingId: house.ListingId,
          listPrice: house.ListPrice,
          longitude: house.Longitude,
          lastChangeTimestamp: house.MajorChangeTimestamp,
          middleOrJuniorSchool: house.MiddleOrJuniorSchool,
          newConstructionYN: house.NewConstructionYN,
          modificationTimestamp: house.OriginatingSystemModificationTimestamp,
          parking: house.ParkingFeatures,
          parkingTotal: house.ParkingTotal,
          propertySubType: house.PropertySubType,
          propertyType: house.PropertyType,
          publicRemarks: house.PublicRemarks,
          streetName: house.StreetName,
          streetNumber: house.StreetNumber,
          subdivisionName: house.SubdivisionName,
          waterSource: house.WaterSource,
          yearBuilt: house.YearBuilt,
          description: house.LongDescription,
          accessibilityFeatures: house.AccessibilityFeatures,
          builderName: house.BuilderName,
          numberOfCompletedUnitsTota: house.CAR_NumberOfCompletedUnitsTotal,
          numberOfDocksTotal: house.CAR_NumberOfDocksTotal,
          numberOfDriveInDoorsTotal: house.CAR_NumberOfDriveInDoorsTotal,
          numberOfProjectedUnitsTotal: house.CAR_NumberOfProjectedUnitsTotal,
          sqFtMain: house.CAR_SqFtMain,
          sqFtMaximumLease: house.CAR_SqFtMaximumLease,
          sqFtMinimumLease: house.CAR_SqFtMinimumLease,
          sqFtThird: house.CAR_SqFtThird,
          sqFtUpper: house.CAR_SqFtUpper,
          streetViewParam: house.CAR_StreetViewParam,
          city: house.City,
          directions: house.Directions,
          fireplaceYN: house.FireplaceYN,
          furnished: house.Furnished,
          laundryFeatures: house.LaundryFeatures,
          livingArea: house.LivingArea,
          originalListPrice: house.OriginalListPrice,
          postalCode: house.PostalCode,
          taxAssessedValue: house.TaxAssessedValue,
          virtualTourURLUnbranded: house.VirtualTourURLUnbranded,
          exteriorFeatures: house.ExteriorFeatures,
          lotSizeArea: house.LotSizeArea,
          lotSizeUnits: house.LotSizeUnits,
          standardStatus: house.StandardStatus,
          masterBedroomLevel:
            house.Rooms?.find(
              (room: any) =>
                room.CAR_RoomTypes &&
                room.CAR_RoomTypes.includes("Primary Bedroom")
            )?.RoomLevel || "",
          media: house.Media
            ? house.Media.map((el: any) => ({
              longDescription: el.LongDescription,
              mediaKey: el.MediaKey,
              order: el.Order,
              mediaURL: el.MediaURL,
            }))
            : [],
          rooms: house.Rooms
            ? house.Rooms.map((el: any) => ({
              bathsFull: el.CAR_BathsFull,
              bathsHalf: el.CAR_BathsHalf,
              bedsTotal: el.CAR_BedsTotal,
              roomKey: el.RoomKey,
              roomLevel: el.RoomLevel,
              roomTypes: el.CAR_RoomTypes,
            }))
            : [],
        };
      });

      //  console.log(house.Rooms.find(room => room.RoomTypes && room.RoomTypes.includes("Primary Bedroom"))?.RoomLevel)

      //creating karma-data and store in database
      HouseModel.create(karmaData);
      // console.log(karmaData.garageBays)
      let nextData = commonData["@odata.nextLink"];

      if (typeof nextData === "undefined") {
        console.log("done");
        res.status(200).json({ success: true });
        return;
      }

      let value = nextData.substring(nextData.lastIndexOf("=") + 1);

      console.log(value);

      if (nextData) {
        reload(value);
      } else {
        res.status(200).json({ success: false });
      }
    }

    await reload("0");

    // console.log("here we get the value",value)
  } catch (error: any) {
    console.log("Error in loadPropertiesActive : ", error.toString());
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
    return;
  }
};

//route 3 :- comingsoon
export const loadPropertiesComingSoon = async (req: Request, res: Response) => {
  try {
    async function reload(skip: string) {
      const response = await axios.get("https://api.mlsgrid.com/v2/Property", {
        params: {
          $filter:
            "OriginatingSystemName eq 'carolina' and MlgCanView eq true and StandardStatus eq 'Coming Soon'",

          $skip: skip,
        },
        headers: {
          "Accept-Encoding": "gzip,deflate",
          Authorization: process.env.MLS_TOKEN,
        },
      });

      let commonData = response.data;

      // filtering data from api and stored in karmaData
      let karmaData = commonData.value.map((house: any) => {
        return {
          appliances: house.Appliances,
          associationFee: house.AssociationFee,
          associationName: house.AssociationName,
          availabilityDate: house.AvailabilityDate,
          bathroomsFull: house.BathroomsFull,
          bathroomsHalf: house.BathroomsHalf,
          bathroomsTotalInteger: house.BathroomsTotalInteger,
          bedroomsTotal: house.BedroomsTotal,
          sqFtBasement: house.BelowGradeFinishedArea,
          buildingAreaTotal: house.BuildingAreaTotal,
          buyerAgencyCompensation: house.BuyerAgencyCompensation,
          sellingAgentMLSBoard: house.BuyerAgentAOR,
          sellingAgentFullName: house.BuyerAgentFullName,
          sellingOfficeName: house.BuyerOfficeName,
          sellingOfficePhone: house.BuyerOfficePhone,
          additionalInformation: house.CAR_AdditionalInformation,
          auctionBidInformation: house.CAR_AuctionBidInformation,
          auctionBidType: house.CAR_AuctionBidType,
          auctionYn: house.CAR_AuctionYN,
          ceilingHeight: house.CAR_CeilingHeight,
          price: house.ListPrice,
          constructionStatus: house.CAR_ConstructionStatus,
          constructionType: house.CAR_ConstructionType,
          coSellingTeamMUI: house.CAR_CoSellingTeam_MUI,
          coSellingTeamMLSID: house.CAR_CoSellingTeamMLSID,
          coSellingTeamName: house.CAR_CoSellingTeamName,
          financingInformation: house.CAR_FinancingInformation,
          hoaSubjectToDues: house.CAR_HOASubjectToDues,
          garageBays: house.CAR_NumberOfBays,
          officeSqFt: house.CAR_OfficeSqFt,
          porch: house.CAR_Porch,
          potentialIncome: house.CAR_PotentialIncome,
          sqFtGarage: house.CAR_SqFtGarage,
          sqFtTotal: house.CAR_TotalPrimaryHLA,
          coSellingAgentMLSBoard: house.CoBuyerAgentAOR,
          coSellingAgentPrimaryBoard: house.CoBuyerAgentAOR,
          coSellingAgentFullName: house.CoBuyerAgentFullName,
          coSellingAgentMUI: house.CoBuyerAgentKey,
          coSellingAgentMLSID: house.CoBuyerAgentMlsId,
          coSellingAgentDirectWorkPhone: house.CoBuyerAgentOfficePhone,
          coSellingOfficeMUI: house.CoBuyerOfficeKey,
          coSellingOfficeMLSID: house.CoBuyerOfficeMlsId,
          coSellingOfficeName: house.CoBuyerOfficeName,
          coSellingOfficePhone: house.CoBuyerOfficePhone,
          coListAgentMLSBoard: house.CoListAgentAOR,
          coListAgentPrimaryBoard: house.CoListAgentAOR,
          coListAgentFullName: house.CoListAgentFullName,
          coListAgentMUI: house.CoListAgentKey,
          coListAgentMLSID: house.CoListAgentMlsId,
          coListAgentDirectWorkPhone: house.CoListAgentPreferredPhone,
          coListOfficeMUI: house.coListOfficeKey,
          coListOfficeMLSID: house.CoListOfficeMlsId,
          coListOfficeName: house.CoListOfficeName,
          communityFeatures: house.CommunityFeatures,
          sellerContribution: house.ConcessionsAmount,
          countyOrParish: house.CountyOrParish,
          cumulativeDaysOnMarket: house.CumulativeDaysOnMarket,
          daysOnMarket: house.DaysOnMarket,
          elementarySchool: house.ElementarySchool,
          highSchool: house.HighSchool,
          latitude: house.Latitude,
          listingAgentMLSBoard: house.ListAgentAOR,
          listingAgentPrimaryBoard: house.ListAgentAOR,
          listAgentDirectWorkPhone: house.ListAgentDirectPhone,
          listAgentFullName: house.ListAgentFullName,
          listAgentMUI: house.ListAgentKey,
          listAgentMLSID: house.ListAgentMlsId,
          listingType: house.ListingAgreement,
          listingContractDate: house.ListingContractDate,
          listingId: house.ListingId,
          listPrice: house.ListPrice,
          longitude: house.Longitude,
          lastChangeTimestamp: house.MajorChangeTimestamp,
          middleOrJuniorSchool: house.MiddleOrJuniorSchool,
          newConstructionYN: house.NewConstructionYN,
          modificationTimestamp: house.OriginatingSystemModificationTimestamp,
          parking: house.ParkingFeatures,
          parkingTotal: house.ParkingTotal,
          propertySubType: house.PropertySubType,
          propertyType: house.PropertyType,
          publicRemarks: house.PublicRemarks,
          streetName: house.StreetName,
          streetNumber: house.StreetNumber,
          subdivisionName: house.SubdivisionName,
          waterSource: house.WaterSource,
          yearBuilt: house.YearBuilt,
          description: house.LongDescription,
          accessibilityFeatures: house.AccessibilityFeatures,
          builderName: house.BuilderName,
          numberOfCompletedUnitsTota: house.CAR_NumberOfCompletedUnitsTotal,
          numberOfDocksTotal: house.CAR_NumberOfDocksTotal,
          numberOfDriveInDoorsTotal: house.CAR_NumberOfDriveInDoorsTotal,
          numberOfProjectedUnitsTotal: house.CAR_NumberOfProjectedUnitsTotal,
          sqFtMain: house.CAR_SqFtMain,
          sqFtMaximumLease: house.CAR_SqFtMaximumLease,
          sqFtMinimumLease: house.CAR_SqFtMinimumLease,
          sqFtThird: house.CAR_SqFtThird,
          sqFtUpper: house.CAR_SqFtUpper,
          streetViewParam: house.CAR_StreetViewParam,
          city: house.City,
          directions: house.Directions,
          fireplaceYN: house.FireplaceYN,
          furnished: house.Furnished,
          laundryFeatures: house.LaundryFeatures,
          livingArea: house.LivingArea,
          originalListPrice: house.OriginalListPrice,
          postalCode: house.PostalCode,
          taxAssessedValue: house.TaxAssessedValue,
          virtualTourURLUnbranded: house.VirtualTourURLUnbranded,
          exteriorFeatures: house.ExteriorFeatures,
          lotSizeArea: house.LotSizeArea,
          lotSizeUnits: house.LotSizeUnits,
          standardStatus: house.StandardStatus,
          masterBedroomLevel:
            house.Rooms?.find(
              (room: any) =>
                room.CAR_RoomTypes &&
                room.CAR_RoomTypes.includes("Primary Bedroom")
            )?.RoomLevel || "",
          media: house.Media
            ? house.Media.map((el: any) => ({
              longDescription: el.LongDescription,
              mediaKey: el.MediaKey,
              order: el.Order,
              mediaURL: el.MediaURL,
            }))
            : [],
          rooms: house.Rooms
            ? house.Rooms.map((el: any) => ({
              bathsFull: el.CAR_BathsFull,
              bathsHalf: el.CAR_BathsHalf,
              bedsTotal: el.CAR_BedsTotal,
              roomKey: el.RoomKey,
              roomLevel: el.RoomLevel,
              roomTypes: el.CAR_RoomTypes,
            }))
            : [],
        };
      });

      //  console.log(house.Rooms.find(room => room.RoomTypes && room.RoomTypes.includes("Primary Bedroom"))?.RoomLevel)

      //creating karma-data and store in database
      HouseModel.create(karmaData);
      // console.log(karmaData.garageBays)
      let nextData = commonData["@odata.nextLink"];

      if (typeof nextData === "undefined") {
        console.log("done");
        res.status(200).json({ success: true });
        return;
      }

      let value = nextData.substring(nextData.lastIndexOf("=") + 1);

      console.log(value);

      if (nextData) {
        reload(value);
      } else {
        res.status(200).json({ success: false });
      }
    }

    await reload("0");

    // console.log("here we get the value",value)
  } catch (error: any) {
    console.log("Error in loadPropertiesComingSoon : ", error.toString());
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
    return;
  }
};

//route 4:- getting data from mongo database using pagination ////// now its an expectional route delete later
export const fetchProperties = async (req: Request, res: Response) => {
  const { page } = req.body;

  //variable per page
  let perPage = 12;

  //total no of records from data base
  let total = await HouseModel.count();

  //calculation no of pagination required
  let pages = Math.ceil(total / perPage);

  //get current pageno
  let pageNumber = page == null ? 1 : page;

  //get record to skip
  let startFrom = (pageNumber - 1) * perPage;

  //get data from mongodb using pagination
  let response = await HouseModel.find({})
    .sort({ id: 1 })
    .skip(startFrom)
    .limit(perPage);

  res.json(response);
};

//route 5 :-  getting single data mongo database using id ;
export const fetchById = async (req: Request, res: Response) => {
  //getting id from user
  let id = req.params["id"];

  //getting data from particular house
  let response = await HouseModel.findById(id);

  res.json(response);
};

//route 6 :- get data using properties;
export const fetchByProperties = async (req: Request, res: Response) => {
  // using params to change page
  let param = req.params["page"];
  let page = parseInt(param);

  //destructuring the body
  const {
    minPrice,
    maxPrice,
    bedroomsTotal,
    minbuildingAreaTotal,
    maxbuildingAreaTotal,
    minyearBuilt,
    maxyearBuilt,
    propertySubType,
    communityFeatures,
    exteriorFeatures,
    bathroomsTotalInteger,
    lotSizeArea,
    lotSizeUnits,
    masterBedroomLevel,
    standardStatus,
    searchtext,
  } = req.body;

  //created match to store the object
  let match: any = {};

  //condition to put obj in match
  if (bedroomsTotal) {
    match.bedroomsTotal = { $gte: bedroomsTotal };
  }
  if (bathroomsTotalInteger) {
    match.bathroomsTotalInteger = { $gte: bathroomsTotalInteger };
  }
  if (minPrice || maxPrice) {
    match.price = { $gt: minPrice, $lt: maxPrice };
  }
  if (minbuildingAreaTotal || maxbuildingAreaTotal) {
    match.buildingAreaTotal = {
      $gt: minbuildingAreaTotal,
      $lt: maxbuildingAreaTotal,
    };
  }
  if (minyearBuilt || maxyearBuilt) {
    match.yearBuilt = { $gt: minyearBuilt, $lt: maxyearBuilt };
  }
  if (propertySubType) {
    match.propertySubType = propertySubType;
  }
  if (masterBedroomLevel) {
    match.masterBedroomLevel = masterBedroomLevel;
  }
  if (standardStatus) {
    match.standardStatus = standardStatus;
  }

  //changes has to be done here
  if (communityFeatures != "") {
    match.communityFeatures = { $all: [...communityFeatures] };
  }
  if (exteriorFeatures != "") {
    match.exteriorFeatures = { $all: [...exteriorFeatures] };
  }
  if (lotSizeArea) {
    match.lotSizeArea = { $gte: lotSizeArea };
  }
  if (lotSizeUnits) {
    match.lotSizeUnits = { $gte: lotSizeUnits };
  }
  if (searchtext) {
    // match.city = { $regex: searchtext}
    match = {
      ...match,
      $or: [
        { city: { $regex: searchtext, $options: "i" } },
        { postalCode: { $eq: searchtext } },
        { subdivisionName: { $regex: searchtext, $options: "i" } },
        { listingId: { $regex: searchtext, $options: "i" } },
      ],
    };
  }

  console.log(match);

  //to get the total no of pages
  let pages = await HouseModel.countDocuments(match);

  console.log(pages);

  let totalpage;

  if (pages < 8) {
    totalpage = 1;
  } else {
    totalpage = Math.ceil(pages / 8);
  }

  //filtered data from the database.
  let response = await HouseModel.aggregate([
    { $match: match },
    { $skip: 8 * page },
    { $limit: 8 },
    {
      $sort: {
        price: 1,
        sqFtTotal: 1,
        bedroomsTotal: 1,
        bathroomsTotalInteger: 1,
      },
    },
  ]);

  res.json({ data: response, pages: totalpage });
};

//route 7 :- upsert data in mongodb activeundercontract
export const upsertActiveunderContract = async () => {
  try {
    async function reload(skip: string) {
      const response = await axios.get("https://api.mlsgrid.com/v2/Property", {
        params: {
          $filter:
            "OriginatingSystemName eq 'carolina' and MlgCanView eq true and StandardStatus eq 'Active Under Contract'",
          $expand: "Media,Rooms",

          $skip: skip,
        },
        headers: {
          "Accept-Encoding": "gzip,deflate",
          Authorization: process.env.MLS_TOKEN,
        },
      });

      let commonData = response.data;

      // filtering data from api and stored in karmaData
      let karmaData = commonData.value.map((house: any) => {
        return {
          appliances: house.Appliances,
          associationFee: house.AssociationFee,
          associationName: house.AssociationName,
          availabilityDate: house.AvailabilityDate,
          bathroomsFull: house.BathroomsFull,
          bathroomsHalf: house.BathroomsHalf,
          bathroomsTotalInteger: house.BathroomsTotalInteger,
          bedroomsTotal: house.BedroomsTotal,
          sqFtBasement: house.BelowGradeFinishedArea,
          buildingAreaTotal: house.BuildingAreaTotal,
          buyerAgencyCompensation: house.BuyerAgencyCompensation,
          sellingAgentMLSBoard: house.BuyerAgentAOR,
          sellingAgentFullName: house.BuyerAgentFullName,
          sellingOfficeName: house.BuyerOfficeName,
          sellingOfficePhone: house.BuyerOfficePhone,
          additionalInformation: house.CAR_AdditionalInformation,
          auctionBidInformation: house.CAR_AuctionBidInformation,
          auctionBidType: house.CAR_AuctionBidType,
          auctionYn: house.CAR_AuctionYN,
          ceilingHeight: house.CAR_CeilingHeight,
          price: house.ListPrice,
          constructionStatus: house.CAR_ConstructionStatus,
          constructionType: house.CAR_ConstructionType,
          coSellingTeamMUI: house.CAR_CoSellingTeam_MUI,
          coSellingTeamMLSID: house.CAR_CoSellingTeamMLSID,
          coSellingTeamName: house.CAR_CoSellingTeamName,
          financingInformation: house.CAR_FinancingInformation,
          hoaSubjectToDues: house.CAR_HOASubjectToDues,
          garageBays: house.CAR_NumberOfBays,
          officeSqFt: house.CAR_OfficeSqFt,
          porch: house.CAR_Porch,
          potentialIncome: house.CAR_PotentialIncome,
          sqFtGarage: house.CAR_SqFtGarage,
          sqFtTotal: house.CAR_TotalPrimaryHLA,
          coSellingAgentMLSBoard: house.CoBuyerAgentAOR,
          coSellingAgentPrimaryBoard: house.CoBuyerAgentAOR,
          coSellingAgentFullName: house.CoBuyerAgentFullName,
          coSellingAgentMUI: house.CoBuyerAgentKey,
          coSellingAgentMLSID: house.CoBuyerAgentMlsId,
          coSellingAgentDirectWorkPhone: house.CoBuyerAgentOfficePhone,
          coSellingOfficeMUI: house.CoBuyerOfficeKey,
          coSellingOfficeMLSID: house.CoBuyerOfficeMlsId,
          coSellingOfficeName: house.CoBuyerOfficeName,
          coSellingOfficePhone: house.CoBuyerOfficePhone,
          coListAgentMLSBoard: house.CoListAgentAOR,
          coListAgentPrimaryBoard: house.CoListAgentAOR,
          coListAgentFullName: house.CoListAgentFullName,
          coListAgentMUI: house.CoListAgentKey,
          coListAgentMLSID: house.CoListAgentMlsId,
          coListAgentDirectWorkPhone: house.CoListAgentPreferredPhone,
          coListOfficeMUI: house.coListOfficeKey,
          coListOfficeMLSID: house.CoListOfficeMlsId,
          coListOfficeName: house.CoListOfficeName,
          communityFeatures: house.CommunityFeatures,
          sellerContribution: house.ConcessionsAmount,
          countyOrParish: house.CountyOrParish,
          cumulativeDaysOnMarket: house.CumulativeDaysOnMarket,
          daysOnMarket: house.DaysOnMarket,
          elementarySchool: house.ElementarySchool,
          highSchool: house.HighSchool,
          latitude: house.Latitude,
          listingAgentMLSBoard: house.ListAgentAOR,
          listingAgentPrimaryBoard: house.ListAgentAOR,
          listAgentDirectWorkPhone: house.ListAgentDirectPhone,
          listAgentFullName: house.ListAgentFullName,
          listAgentMUI: house.ListAgentKey,
          listAgentMLSID: house.ListAgentMlsId,
          listingType: house.ListingAgreement,
          listingContractDate: house.ListingContractDate,
          listingId: house.ListingId,
          listPrice: house.ListPrice,
          longitude: house.Longitude,
          lastChangeTimestamp: house.MajorChangeTimestamp,
          middleOrJuniorSchool: house.MiddleOrJuniorSchool,
          newConstructionYN: house.NewConstructionYN,
          modificationTimestamp: house.OriginatingSystemModificationTimestamp,
          parking: house.ParkingFeatures,
          parkingTotal: house.ParkingTotal,
          propertySubType: house.PropertySubType,
          propertyType: house.PropertyType,
          publicRemarks: house.PublicRemarks,
          streetName: house.StreetName,
          streetNumber: house.StreetNumber,
          subdivisionName: house.SubdivisionName,
          waterSource: house.WaterSource,
          yearBuilt: house.YearBuilt,
          description: house.LongDescription,
          accessibilityFeatures: house.AccessibilityFeatures,
          builderName: house.BuilderName,
          numberOfCompletedUnitsTota: house.CAR_NumberOfCompletedUnitsTotal,
          numberOfDocksTotal: house.CAR_NumberOfDocksTotal,
          numberOfDriveInDoorsTotal: house.CAR_NumberOfDriveInDoorsTotal,
          numberOfProjectedUnitsTotal: house.CAR_NumberOfProjectedUnitsTotal,
          sqFtMain: house.CAR_SqFtMain,
          sqFtMaximumLease: house.CAR_SqFtMaximumLease,
          sqFtMinimumLease: house.CAR_SqFtMinimumLease,
          sqFtThird: house.CAR_SqFtThird,
          sqFtUpper: house.CAR_SqFtUpper,
          streetViewParam: house.CAR_StreetViewParam,
          city: house.City,
          directions: house.Directions,
          fireplaceYN: house.FireplaceYN,
          furnished: house.Furnished,
          laundryFeatures: house.LaundryFeatures,
          livingArea: house.LivingArea,
          originalListPrice: house.OriginalListPrice,
          postalCode: house.PostalCode,
          taxAssessedValue: house.TaxAssessedValue,
          virtualTourURLUnbranded: house.VirtualTourURLUnbranded,
          exteriorFeatures: house.ExteriorFeatures,
          lotSizeArea: house.LotSizeArea,
          lotSizeUnits: house.LotSizeUnits,
          standardStatus: house.StandardStatus,
          masterBedroomLevel:
            house.Rooms?.find(
              (room: any) =>
                room.CAR_RoomTypes &&
                room.CAR_RoomTypes.includes("Primary Bedroom")
            )?.RoomLevel || "",
          media: house.Media
            ? house.Media.map((el: any) => ({
              longDescription: el.LongDescription,
              mediaKey: el.MediaKey,
              order: el.Order,
              mediaURL: el.MediaURL,
            }))
            : [],
          rooms: house.Rooms
            ? house.Rooms.map((el: any) => ({
              bathsFull: el.CAR_BathsFull,
              bathsHalf: el.CAR_BathsHalf,
              bedsTotal: el.CAR_BedsTotal,
              roomKey: el.RoomKey,
              roomLevel: el.RoomLevel,
              roomTypes: el.CAR_RoomTypes,
            }))
            : [],
        };
      });

      //upsert functionality here
      karmaData.forEach((house: any) => {
        let queryobject = {
          listingId: house.listingId,
        };
        let newupdatedvalues = { $set: { ...house } };
        const option = { upsert: true };
        HouseModel.updateMany(
          queryobject,
          newupdatedvalues,
          option,
          // function (error, result) {
          //   console.log(error, result);
          // }
        );
      });

      let nextData = commonData["@odata.nextLink"];

      if (typeof nextData === "undefined") {
        console.log("Done ActiveunderContract ");
        return;
      }

      let value = nextData.substring(nextData.lastIndexOf("=") + 1);

      console.log(value);

      if (nextData) {
        reload(value);
      } else {
        console.log("some problems occurred");
      }
    }

    await reload("0");

    // console.log("here we get the value",value)
  } catch (error: any) {
    console.log("Error in upsertcommingsoon : ", error.toString());
    return;
  }
};

//route 8 :- upsert data in mongodb active
export const upsertActive = async () => {
  try {
    async function reload(skip: string) {
      const response = await axios.get("https://api.mlsgrid.com/v2/Property", {
        params: {
          $filter:
            "OriginatingSystemName eq 'carolina' and MlgCanView eq true and StandardStatus eq 'Active'",
          $expand: "Media,Rooms",

          $skip: skip,
        },
        headers: {
          "Accept-Encoding": "gzip,deflate",
          Authorization: process.env.MLS_TOKEN,
        },
      });

      let commonData = response.data;

      // filtering data from api and stored in karmaData
      let karmaData = commonData.value.map((house: any) => {
        return {
          appliances: house.Appliances,
          associationFee: house.AssociationFee,
          associationName: house.AssociationName,
          availabilityDate: house.AvailabilityDate,
          bathroomsFull: house.BathroomsFull,
          bathroomsHalf: house.BathroomsHalf,
          bathroomsTotalInteger: house.BathroomsTotalInteger,
          bedroomsTotal: house.BedroomsTotal,
          sqFtBasement: house.BelowGradeFinishedArea,
          buildingAreaTotal: house.BuildingAreaTotal,
          buyerAgencyCompensation: house.BuyerAgencyCompensation,
          sellingAgentMLSBoard: house.BuyerAgentAOR,
          sellingAgentFullName: house.BuyerAgentFullName,
          sellingOfficeName: house.BuyerOfficeName,
          sellingOfficePhone: house.BuyerOfficePhone,
          additionalInformation: house.CAR_AdditionalInformation,
          auctionBidInformation: house.CAR_AuctionBidInformation,
          auctionBidType: house.CAR_AuctionBidType,
          auctionYn: house.CAR_AuctionYN,
          ceilingHeight: house.CAR_CeilingHeight,
          price: house.ListPrice,
          constructionStatus: house.CAR_ConstructionStatus,
          constructionType: house.CAR_ConstructionType,
          coSellingTeamMUI: house.CAR_CoSellingTeam_MUI,
          coSellingTeamMLSID: house.CAR_CoSellingTeamMLSID,
          coSellingTeamName: house.CAR_CoSellingTeamName,
          financingInformation: house.CAR_FinancingInformation,
          hoaSubjectToDues: house.CAR_HOASubjectToDues,
          garageBays: house.CAR_NumberOfBays,
          officeSqFt: house.CAR_OfficeSqFt,
          porch: house.CAR_Porch,
          potentialIncome: house.CAR_PotentialIncome,
          sqFtGarage: house.CAR_SqFtGarage,
          sqFtTotal: house.CAR_TotalPrimaryHLA,
          coSellingAgentMLSBoard: house.CoBuyerAgentAOR,
          coSellingAgentPrimaryBoard: house.CoBuyerAgentAOR,
          coSellingAgentFullName: house.CoBuyerAgentFullName,
          coSellingAgentMUI: house.CoBuyerAgentKey,
          coSellingAgentMLSID: house.CoBuyerAgentMlsId,
          coSellingAgentDirectWorkPhone: house.CoBuyerAgentOfficePhone,
          coSellingOfficeMUI: house.CoBuyerOfficeKey,
          coSellingOfficeMLSID: house.CoBuyerOfficeMlsId,
          coSellingOfficeName: house.CoBuyerOfficeName,
          coSellingOfficePhone: house.CoBuyerOfficePhone,
          coListAgentMLSBoard: house.CoListAgentAOR,
          coListAgentPrimaryBoard: house.CoListAgentAOR,
          coListAgentFullName: house.CoListAgentFullName,
          coListAgentMUI: house.CoListAgentKey,
          coListAgentMLSID: house.CoListAgentMlsId,
          coListAgentDirectWorkPhone: house.CoListAgentPreferredPhone,
          coListOfficeMUI: house.coListOfficeKey,
          coListOfficeMLSID: house.CoListOfficeMlsId,
          coListOfficeName: house.CoListOfficeName,
          communityFeatures: house.CommunityFeatures,
          sellerContribution: house.ConcessionsAmount,
          countyOrParish: house.CountyOrParish,
          cumulativeDaysOnMarket: house.CumulativeDaysOnMarket,
          daysOnMarket: house.DaysOnMarket,
          elementarySchool: house.ElementarySchool,
          highSchool: house.HighSchool,
          latitude: house.Latitude,
          listingAgentMLSBoard: house.ListAgentAOR,
          listingAgentPrimaryBoard: house.ListAgentAOR,
          listAgentDirectWorkPhone: house.ListAgentDirectPhone,
          listAgentFullName: house.ListAgentFullName,
          listAgentMUI: house.ListAgentKey,
          listAgentMLSID: house.ListAgentMlsId,
          listingType: house.ListingAgreement,
          listingContractDate: house.ListingContractDate,
          listingId: house.ListingId,
          listPrice: house.ListPrice,
          longitude: house.Longitude,
          lastChangeTimestamp: house.MajorChangeTimestamp,
          middleOrJuniorSchool: house.MiddleOrJuniorSchool,
          newConstructionYN: house.NewConstructionYN,
          modificationTimestamp: house.OriginatingSystemModificationTimestamp,
          parking: house.ParkingFeatures,
          parkingTotal: house.ParkingTotal,
          propertySubType: house.PropertySubType,
          propertyType: house.PropertyType,
          publicRemarks: house.PublicRemarks,
          streetName: house.StreetName,
          streetNumber: house.StreetNumber,
          subdivisionName: house.SubdivisionName,
          waterSource: house.WaterSource,
          yearBuilt: house.YearBuilt,
          description: house.LongDescription,
          accessibilityFeatures: house.AccessibilityFeatures,
          builderName: house.BuilderName,
          numberOfCompletedUnitsTota: house.CAR_NumberOfCompletedUnitsTotal,
          numberOfDocksTotal: house.CAR_NumberOfDocksTotal,
          numberOfDriveInDoorsTotal: house.CAR_NumberOfDriveInDoorsTotal,
          numberOfProjectedUnitsTotal: house.CAR_NumberOfProjectedUnitsTotal,
          sqFtMain: house.CAR_SqFtMain,
          sqFtMaximumLease: house.CAR_SqFtMaximumLease,
          sqFtMinimumLease: house.CAR_SqFtMinimumLease,
          sqFtThird: house.CAR_SqFtThird,
          sqFtUpper: house.CAR_SqFtUpper,
          streetViewParam: house.CAR_StreetViewParam,
          city: house.City,
          directions: house.Directions,
          fireplaceYN: house.FireplaceYN,
          furnished: house.Furnished,
          laundryFeatures: house.LaundryFeatures,
          livingArea: house.LivingArea,
          originalListPrice: house.OriginalListPrice,
          postalCode: house.PostalCode,
          taxAssessedValue: house.TaxAssessedValue,
          virtualTourURLUnbranded: house.VirtualTourURLUnbranded,
          exteriorFeatures: house.ExteriorFeatures,
          lotSizeArea: house.LotSizeArea,
          lotSizeUnits: house.LotSizeUnits,
          standardStatus: house.StandardStatus,
          masterBedroomLevel:
            house.Rooms?.find(
              (room: any) =>
                room.CAR_RoomTypes &&
                room.CAR_RoomTypes.includes("Primary Bedroom")
            )?.RoomLevel || "",
          media: house.Media
            ? house.Media.map((el: any) => ({
              longDescription: el.LongDescription,
              mediaKey: el.MediaKey,
              order: el.Order,
              mediaURL: el.MediaURL,
            }))
            : [],
          rooms: house.Rooms
            ? house.Rooms.map((el: any) => ({
              bathsFull: el.CAR_BathsFull,
              bathsHalf: el.CAR_BathsHalf,
              bedsTotal: el.CAR_BedsTotal,
              roomKey: el.RoomKey,
              roomLevel: el.RoomLevel,
              roomTypes: el.CAR_RoomTypes,
            }))
            : [],
        };
      });

      //upsert functionality here
      karmaData.forEach((house: any) => {
        let queryobject = {
          listingId: house.listingId,
        };
        let newupdatedvalues = { $set: { ...house } };
        const option = { upsert: true };
        HouseModel.updateMany(
          queryobject,
          newupdatedvalues,
          option,
          // function (error, result) {
          //   console.log(error, result);
          // }
        );
      });

      // console.log(karmaData.garageBays)
      let nextData = commonData["@odata.nextLink"];

      if (typeof nextData === "undefined") {
        console.log("Done Active");
        return;
      }

      let value = nextData.substring(nextData.lastIndexOf("=") + 1);

      console.log(value);

      if (nextData) {
        reload(value);
      } else {
        console.log("some problems occurred");
      }
    }

    await reload("0");

    // console.log("here we get the value",value)
  } catch (error: any) {
    console.log("Error in upsertcommingsoon : ", error.toString());
    return;
  }
};

//route 9 :- upsert data in mongodb active
export const upsertComingSoon = async () => {
  try {
    async function reload(skip: string) {
      const response = await axios.get("https://api.mlsgrid.com/v2/Property", {
        params: {
          $filter:
            "OriginatingSystemName eq 'carolina' and MlgCanView eq true and StandardStatus eq 'Coming Soon'",

          $skip: skip,
        },
        headers: {
          "Accept-Encoding": "gzip,deflate",
          Authorization: process.env.MLS_TOKEN,
        },
      });

      let commonData = response.data;

      // filtering data from api and stored in karmaData
      let karmaData = commonData.value.map((house: any) => {
        return {
          appliances: house.Appliances,
          associationFee: house.AssociationFee,
          associationName: house.AssociationName,
          availabilityDate: house.AvailabilityDate,
          bathroomsFull: house.BathroomsFull,
          bathroomsHalf: house.BathroomsHalf,
          bathroomsTotalInteger: house.BathroomsTotalInteger,
          bedroomsTotal: house.BedroomsTotal,
          sqFtBasement: house.BelowGradeFinishedArea,
          buildingAreaTotal: house.BuildingAreaTotal,
          buyerAgencyCompensation: house.BuyerAgencyCompensation,
          sellingAgentMLSBoard: house.BuyerAgentAOR,
          sellingAgentFullName: house.BuyerAgentFullName,
          sellingOfficeName: house.BuyerOfficeName,
          sellingOfficePhone: house.BuyerOfficePhone,
          additionalInformation: house.CAR_AdditionalInformation,
          auctionBidInformation: house.CAR_AuctionBidInformation,
          auctionBidType: house.CAR_AuctionBidType,
          auctionYn: house.CAR_AuctionYN,
          ceilingHeight: house.CAR_CeilingHeight,
          price: house.ListPrice,
          constructionStatus: house.CAR_ConstructionStatus,
          constructionType: house.CAR_ConstructionType,
          coSellingTeamMUI: house.CAR_CoSellingTeam_MUI,
          coSellingTeamMLSID: house.CAR_CoSellingTeamMLSID,
          coSellingTeamName: house.CAR_CoSellingTeamName,
          financingInformation: house.CAR_FinancingInformation,
          hoaSubjectToDues: house.CAR_HOASubjectToDues,
          garageBays: house.CAR_NumberOfBays,
          officeSqFt: house.CAR_OfficeSqFt,
          porch: house.CAR_Porch,
          potentialIncome: house.CAR_PotentialIncome,
          sqFtGarage: house.CAR_SqFtGarage,
          sqFtTotal: house.CAR_TotalPrimaryHLA,
          coSellingAgentMLSBoard: house.CoBuyerAgentAOR,
          coSellingAgentPrimaryBoard: house.CoBuyerAgentAOR,
          coSellingAgentFullName: house.CoBuyerAgentFullName,
          coSellingAgentMUI: house.CoBuyerAgentKey,
          coSellingAgentMLSID: house.CoBuyerAgentMlsId,
          coSellingAgentDirectWorkPhone: house.CoBuyerAgentOfficePhone,
          coSellingOfficeMUI: house.CoBuyerOfficeKey,
          coSellingOfficeMLSID: house.CoBuyerOfficeMlsId,
          coSellingOfficeName: house.CoBuyerOfficeName,
          coSellingOfficePhone: house.CoBuyerOfficePhone,
          coListAgentMLSBoard: house.CoListAgentAOR,
          coListAgentPrimaryBoard: house.CoListAgentAOR,
          coListAgentFullName: house.CoListAgentFullName,
          coListAgentMUI: house.CoListAgentKey,
          coListAgentMLSID: house.CoListAgentMlsId,
          coListAgentDirectWorkPhone: house.CoListAgentPreferredPhone,
          coListOfficeMUI: house.coListOfficeKey,
          coListOfficeMLSID: house.CoListOfficeMlsId,
          coListOfficeName: house.CoListOfficeName,
          communityFeatures: house.CommunityFeatures,
          sellerContribution: house.ConcessionsAmount,
          countyOrParish: house.CountyOrParish,
          cumulativeDaysOnMarket: house.CumulativeDaysOnMarket,
          daysOnMarket: house.DaysOnMarket,
          elementarySchool: house.ElementarySchool,
          highSchool: house.HighSchool,
          latitude: house.Latitude,
          listingAgentMLSBoard: house.ListAgentAOR,
          listingAgentPrimaryBoard: house.ListAgentAOR,
          listAgentDirectWorkPhone: house.ListAgentDirectPhone,
          listAgentFullName: house.ListAgentFullName,
          listAgentMUI: house.ListAgentKey,
          listAgentMLSID: house.ListAgentMlsId,
          listingType: house.ListingAgreement,
          listingContractDate: house.ListingContractDate,
          listingId: house.ListingId,
          listPrice: house.ListPrice,
          longitude: house.Longitude,
          lastChangeTimestamp: house.MajorChangeTimestamp,
          middleOrJuniorSchool: house.MiddleOrJuniorSchool,
          newConstructionYN: house.NewConstructionYN,
          modificationTimestamp: house.OriginatingSystemModificationTimestamp,
          parking: house.ParkingFeatures,
          parkingTotal: house.ParkingTotal,
          propertySubType: house.PropertySubType,
          propertyType: house.PropertyType,
          publicRemarks: house.PublicRemarks,
          streetName: house.StreetName,
          streetNumber: house.StreetNumber,
          subdivisionName: house.SubdivisionName,
          waterSource: house.WaterSource,
          yearBuilt: house.YearBuilt,
          description: house.LongDescription,
          accessibilityFeatures: house.AccessibilityFeatures,
          builderName: house.BuilderName,
          numberOfCompletedUnitsTota: house.CAR_NumberOfCompletedUnitsTotal,
          numberOfDocksTotal: house.CAR_NumberOfDocksTotal,
          numberOfDriveInDoorsTotal: house.CAR_NumberOfDriveInDoorsTotal,
          numberOfProjectedUnitsTotal: house.CAR_NumberOfProjectedUnitsTotal,
          sqFtMain: house.CAR_SqFtMain,
          sqFtMaximumLease: house.CAR_SqFtMaximumLease,
          sqFtMinimumLease: house.CAR_SqFtMinimumLease,
          sqFtThird: house.CAR_SqFtThird,
          sqFtUpper: house.CAR_SqFtUpper,
          streetViewParam: house.CAR_StreetViewParam,
          city: house.City,
          directions: house.Directions,
          fireplaceYN: house.FireplaceYN,
          furnished: house.Furnished,
          laundryFeatures: house.LaundryFeatures,
          livingArea: house.LivingArea,
          originalListPrice: house.OriginalListPrice,
          postalCode: house.PostalCode,
          taxAssessedValue: house.TaxAssessedValue,
          virtualTourURLUnbranded: house.VirtualTourURLUnbranded,
          exteriorFeatures: house.ExteriorFeatures,
          lotSizeArea: house.LotSizeArea,
          lotSizeUnits: house.LotSizeUnits,
          standardStatus: house.StandardStatus,
          masterBedroomLevel:
            house.Rooms?.find(
              (room: any) =>
                room.CAR_RoomTypes &&
                room.CAR_RoomTypes.includes("Primary Bedroom")
            )?.RoomLevel || "",
          media: house.Media
            ? house.Media.map((el: any) => ({
              longDescription: el.LongDescription,
              mediaKey: el.MediaKey,
              order: el.Order,
              mediaURL: el.MediaURL,
            }))
            : [],
          rooms: house.Rooms
            ? house.Rooms.map((el: any) => ({
              bathsFull: el.CAR_BathsFull,
              bathsHalf: el.CAR_BathsHalf,
              bedsTotal: el.CAR_BedsTotal,
              roomKey: el.RoomKey,
              roomLevel: el.RoomLevel,
              roomTypes: el.CAR_RoomTypes,
            }))
            : [],
        };
      });

      //upsert functionality here
      karmaData.forEach((house: any) => {
        let queryobject = {
          listingId: house.listingId,
        };
        let newupdatedvalues = { $set: { ...house } };
        const option = { upsert: true };
        HouseModel.updateMany(
          queryobject,
          newupdatedvalues,
          option,
          // function (error, result) {
          //   console.log(error, result);
          // }
        );
      });


      let nextData = commonData["@odata.nextLink"];

      if (typeof nextData === "undefined") {
        console.log("Done ComingSoon");
        return;
      }

      let value = nextData.substring(nextData.lastIndexOf("=") + 1);

      console.log(value);

      if (nextData) {
        reload(value);
      } else {
        console.log("some propblems occurred");
      }
    }

    await reload("0");

  } catch (error: any) {
    console.log("Error in upsertcommingsoon : ", error.toString());
    return;
  }
};

//cron functionality to run after 15 minutes
cron.schedule("*/15 * * * *", () => {
  upsertComingSoon();
  upsertActive();
  upsertActiveunderContract();
});
