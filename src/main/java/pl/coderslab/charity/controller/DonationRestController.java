package pl.coderslab.charity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.coderslab.charity.service.DonationService;

@RestController
@RequestMapping("/donation")
public class DonationRestController {

    @Autowired
    private DonationService donationService;

    @GetMapping("/count/bags")
    public Long countBags() {

        return donationService.countAllBagsFromAllDonations();

    }

    @GetMapping("/count/supins")
    public Long countSupported() {

        return donationService.countAllSupportedInstitutions();

    }

}
