package pl.coderslab.charity.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import pl.coderslab.charity.repository.DonationRepository;

@Service("donationService")
public class DonationService {

    private DonationRepository donationRepository;

    @Autowired
    public DonationService(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    public Long countAllBagsFromAllDonations() {
        return donationRepository.countAllBagsFromAllDonations();
    }

}
