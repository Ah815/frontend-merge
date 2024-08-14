import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryList from "../components/CategoryList";
import ChoicesList from "../components/ChoicesList";
import Divider from "../components/Divider";
import Heading from "../components/Heading";
import HomeCategories from "../components/HomeCategories";
import HomeHeader from "../components/HomeHeader";
import NearByVendors from "../components/NearByVendors";
import VendorList from "../components/Vendor Screens/ShowAllVendorsToUser";
import pages from "./page.style";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  // console.log(selectedChoice)

  // const { address, setAddress } = useContext(UserReversedGeoCode);
  // const { location, setLocation } = useContext(UserLocationContext);
  // console.log(location);

  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
          <HomeHeader />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ borderBottomEndRadius: 30, borderBottomStartRadius: 30 }}
          >
            <CategoryList
              setSelectedCategory={setSelectedCategory}
              setSelectedSlection={setSelectedSection}
              setSelectedValue={setSelectedValue}
            />
            <ChoicesList
              setSelectedChoice={setSelectedChoice}
              setSelectedSlection={setSelectedSection}
            />
            {selectedCategory !== null && selectedSection !== null ? (
              <View>
                <Heading
                  heading={`Browse${selectedValue}`}
                  onPress={() => {}}
                />

                <HomeCategories />
              </View>
            ) : (
              <View>
                <Divider />
                <Heading heading={"Try a new vendors"} onPress={() => {}} />
                {/* <NewFoodList /> */}
                <VendorList />
                <Heading heading={"Nearby vendors"} onPress={() => {}} />
                <NearByVendors />
                <Divider />
                {/* <Heading heading={"Vendor nearest to you"}  */}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
