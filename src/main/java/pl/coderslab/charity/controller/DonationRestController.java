package pl.coderslab.charity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.coderslab.charity.service.DonationService;

@RestController
@RequestMapping("/don")
public class DonationRestController {

    @Autowired
    private DonationService donationService;

    @GetMapping("/countbags")
    public Long countBags() {

        Long bagsCount = donationService.countAllBagsFromAllDonations();
        return bagsCount;

    }

    @GetMapping("/countsupins")
    public Long countSupported() {

        Long insCount = donationService.countAllSupportedInstitutions();
        return insCount;

    }

}
