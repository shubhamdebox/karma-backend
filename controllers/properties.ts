import { Request, Response } from "express";
import axios from "axios";
import HouseModel from "../models/house";
import { request } from "http";

//route 1:- getting the api from client....

export const loadProperties = async (req: Request, res: Response) => {
  try {
    async function reload(skip: string) {
      const response = await axios.get("https://api.mlsgrid.com/v2/Property", {
        params: {
          $filter:
            "OriginatingSystemName%20eq%20%27carolina%27%20and%20MlgCanView%20eq%20true",
          $expand: "Media,Rooms",
          $skip: skip,
        },
        headers: {
          "Accept-Encoding": "gzip,deflate",
          Authorization: `Bearer efc7dab99edd9fabaa4f5ace700c829c1efd479d`,
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

      //creating karma-data and store in database
      HouseModel.create(karmaData);

      let nextData = commonData["@odata.nextLink"];

      let value = nextData.substring(nextData.lastIndexOf("=") + 1);

      console.log(value);

      if (nextData) {
        reload(value);
      } else {
        res.sendStatus(200).json({ success: true });
      }
    }

    await reload("0");

    // console.log("here we get the value",value)
  } catch (error: any) {
    console.log("Error in loadProperties : ", error.toString());
    res
      .sendStatus(500)
      .json({ error: "Something went wrong, please try again later" });
    return;
  }
};

//route 2 :-  getting data from mongo database using pagination
export const fetchProperties = async (req: Request, res: Response) => {
  const { page } = req.body;
 
  //variable per page
  var perPage = 500;

  //total no of records from data base
  var total = await HouseModel.count();

  //calculation no of pagination required
  var pages = Math.ceil(total / perPage);

  //get current pageno
  var pageNumber = page == null ? 1 : page;

  //get record to skip
  var startFrom = (pageNumber - 1) * perPage;

  //get data from mongodb using pagination
  var response = await HouseModel.find({})
    .sort({ id: 1 })
    .skip(startFrom)
    .limit(perPage);

  res.json(response);
};





//route 3 :-  getting single data mongo database using id ;
export const fetchById = async (req: Request, res: Response) => {
  const { id } = req.body;
  var response = await HouseModel.findById(id);
  res.json(response);
};





//route 4 :- get data using properties;
export const fetchByProperties = async (req: Request, res: Response) => {
  const {
    minPrice,
    maxPrice,
    bedroomsTotal,
    minbuildingAreaTotal,
    maxbuildingAreaTotal,
    minyearBuilt,
    maxyearBuilt,
    propertySubType,
    valuewaterstore
  } = req.body;
  let match: any = {};

  if (bedroomsTotal) {
    match.bedroomsTotal = { $gt: bedroomsTotal };
  }
  if (minPrice && maxPrice) {
    match.price = { $gt: minPrice, $lt: maxPrice };
  }
  if (minbuildingAreaTotal && maxbuildingAreaTotal) {
    match.buildingAreaTotal = {
      $gt: minbuildingAreaTotal,
      $lt: maxbuildingAreaTotal,
    };
  }
  if (minyearBuilt && maxyearBuilt) {
    match.yearBuilt = { $gt: minyearBuilt, $lt: maxyearBuilt };
  }
  if (propertySubType) {
    match.propertySubType = propertySubType;
  }
  if (valuewaterstore) {
    match.waterSource = { $all: [valuewaterstore ]}    
  }


  const response = await HouseModel.aggregate([{ $match: match }]);
  // const response = await HouseModel.find({ waterSource: ["Public"] })
  res.json(response);
 
  console.log(match);
};
